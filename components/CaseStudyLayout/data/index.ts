import { CaseStudy } from "../types/case-study";

const data: Record<string, CaseStudy> = {
  curebay: {
    "title": "Infinite Scroll with IntersectionObserver",
    "subtitle": "Curebay Doctor Dashboard",
    "description": "A seamless infinite scrolling experience built using React, Redux-Saga, and IntersectionObserver. This enabled doctors to browse patient leads without pagination interruptions.",

    "problem": "Doctors needed a fast way to browse hundreds of patient leads without manually clicking pagination buttons. Traditional paginated lists disrupted consultation flow and increased time spent finding information.",

    // "installation": "No installation required — this solution uses the native IntersectionObserver API built into all modern browsers.",
    "installation": {
      "title": "Install Packages",
      "code": "No installation required — this solution uses the native IntersectionObserver API built into all modern browsers.",
      "language": "bash",
      "filePath": "Install packages"
    },

    "codeBlocks": [
      {
        "title": "useInfiniteScroll Hook",
        "filePath": "src/hooks/useInfiniteScroll.ts",
        "language": "tsx",
        "code": "import { useCallback, useRef } from \"react\";\n\nexport function useInfiniteScroll({ loading, hasMore, onLoadMore, deps = [] }: {\n  loading: boolean;\n  hasMore: boolean;\n  onLoadMore: () => void;\n  deps?: any[];\n}) {\n  const observer = useRef<IntersectionObserver | null>(null);\n\n  const lastElementRef = useCallback(\n    (node: HTMLElement | null) => {\n      if (loading) return;\n\n      if (observer.current) observer.current.disconnect();\n\n      observer.current = new IntersectionObserver((entries) => {\n        if (entries[0].isIntersecting && hasMore) {\n          onLoadMore();\n        }\n      });\n\n      if (node) observer.current.observe(node);\n    },\n    [loading, hasMore, ...deps]\n  );\n\n  return lastElementRef;\n}"
      },
      {
        "title": "Redux-Saga Triggered Infinite Scroll in Table",
        "filePath": "src/pages/LeadsByPanelistContainer.tsx",
        "language": "tsx",
        "code": "import { useDispatch, useSelector } from \"react-redux\";\nimport { useParams } from \"react-router-dom\";\nimport {\n  leadsByPanelistIDFetch,\n  moreLeadsByPanelistIDFetch\n} from \"@/actions/panelist.action\";\nimport { useInfiniteScroll } from \"@/hooks/useInfiniteScroll\";\nimport { RootState } from \"@/store\";\n\nexport default function LeadsByPanelistContainer() {\n  const { id } = useParams();\n  const dispatch = useDispatch();\n\n  const leadsState = useSelector((store: RootState) => store.panelistData.leadsByPanelistID);\n\n  const lastRowRef = useInfiniteScroll({\n    loading: leadsState.loading || leadsState.moreLoading,\n    hasMore: leadsState.hasMoreData,\n    onLoadMore: () =>\n      dispatch(\n        moreLeadsByPanelistIDFetch({\n          id,\n          pageNo: leadsState.pageNumber,\n          pageSize: 10\n        })\n      ),\n    deps: [leadsState.pageNumber]\n  });\n\n  // Initial fetch\n  if (!leadsState.firstFetch) {\n    dispatch(\n      leadsByPanelistIDFetch({\n        id,\n        pageNo: leadsState.pageNumber,\n        pageSize: 10\n      })\n    );\n  }\n\n  return (\n    <table className=\"table w-full border rounded-md\">\n      <thead className=\"bg-muted\">\n        <tr>\n          <th>Name</th>\n          <th>City</th>\n          <th>Email</th>\n          <th>Phone</th>\n          <th>Status</th>\n        </tr>\n      </thead>\n\n      <tbody>\n        {leadsState.data.map((lead, index) => (\n          <tr key={lead.id} ref={index === leadsState.data.length - 1 ? lastRowRef : null}>\n            <td>{lead.firstName || \"N/A\"}</td>\n            <td>{lead.district || \"N/A\"}</td>\n            <td>{lead.email || \"N/A\"}</td>\n            <td>{lead.phoneNumber || \"N/A\"}</td>\n            <td>{lead.status || \"N/A\"}</td>\n          </tr>\n        ))}\n\n        {leadsState.moreLoading && (\n          <tr>\n            <td colSpan={5} className=\"text-center py-4 text-muted-foreground\">\n              Loading more leads...\n            </td>\n          </tr>\n        )}\n      </tbody>\n    </table>\n  );\n}"
      }
    ],

    "usage": `const lastRowRef = useInfiniteScroll({
    loading: state.loading,
    hasMore: state.hasMore,
    onLoadMore: () => dispatch(loadMoreAction()),
    deps: [state.pageNumber]
  });`,

    "howItWorks": [
      "The last table row receives a ref from the useInfiniteScroll hook.",
      "IntersectionObserver watches the last row as it enters the viewport.",
      "When visible, it triggers Redux-Saga action moreLeadsByPanelistIDFetch().",
      "API returns the next page, UI appends data, and observer reattaches."
    ],

    "devNotes": [
      "Always disconnect observer before attaching a new one.",
      "Prevent triggering loadMore while loading is true.",
      "Use small page sizes (10-20) for smooth UX.",
      "IntersectionObserver is more performant than scroll events."
    ],

    "impact": [
      "Reduced doctor navigation time by 40%.",
      "Completely removed pagination clicks.",
      "Improved patient-lead review flow during consultations.",
      "Infinite scroll provides smoother, modern UI experience."
    ]
  },
  reduxsaga: {
    "title": "Redux-Saga Configuration & Async Workflow Architecture",
    "subtitle": "Curebay Doctor Dashboard",
    "description": "A powerful asynchronous data layer using Redux-Saga to manage doctor workflows, infinite scroll loading, complex sequencing, and robust error handling in Curebay’s doctor dashboard.",

    "problem": "The Curebay dashboard required complex async flows: chained API calls, conditional fetch logic, infinite scrolling, adding new assignments, and syncing parallel effects. Redux-Thunk was not sufficient to manage multi-step async flows cleanly. We selected Redux-Saga to achieve better control, cancellation, sequencing, and side-effect management.",
    "demo": "Glimpse of dashboad <img src='/images/casestudy/curebay-dashboard.png' class='rounded-lg border shadow-sm w-full' />",

    // "installation": "Redux-Saga is integrated via createSagaMiddleware and run using sagaMiddleware.run(rootSaga). All async operations use pure generator functions for predictable effects.",
    "installation": {
      "title": "Redux-Saga is integrated via createSagaMiddleware and run using sagaMiddleware.run(rootSaga). All async operations use pure generator functions for predictable effects.",
      "code": "npm install redux react-redux redux-saga",
      "language": "language-bash",
      "filePath": "Install packages"
    },

    "codeBlocks": [
      {
        "title": "React Entry Point with Redux + Saga Provider",
        "filePath": "src/index.js",
        "language": "jsx",
        "highlightLines": [6, 12],
        "code": "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport './index.css';\nimport App from './App';\nimport reportWebVitals from './reportWebVitals';\nimport store from './store';\nimport { Provider } from 'react-redux';\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(\n  <React.StrictMode>\n    <Provider store={store}>\n      <App />\n    </Provider>\n  </React.StrictMode>\n);\n\nreportWebVitals();"
      },
      {
        "title": "Redux Store With Saga Middleware",
        "filePath": "src/store.js",
        "language": "js",
        "highlightLines": [3, 9],
        "code": "import { applyMiddleware, compose, createStore } from \"redux\";\nimport createSagaMiddleware from \"@redux-saga/core\";\nimport rootReducer from \"./reducers\";\nimport sagas from \"./sagas\";\n\nconst sagaMiddleware = createSagaMiddleware();\n\nconst store = createStore(\n  rootReducer,\n  compose(\n    applyMiddleware(sagaMiddleware)\n  )\n);\n\nsagaMiddleware.run(sagas);\nexport default store;"
      },
      {
        "title": "Root Reducer",
        "filePath": "src/reducers/index.js",
        "language": "js",
        "code": "import { combineReducers } from \"redux\";\nimport assignmentsReducer from \"./assignments.reducer\";\nimport assignmentDetails from \"./assignmentDetails.reducer\";\n\nexport default combineReducers({\n  assignments: assignmentsReducer,\n  assignmentDetails: assignmentDetails,\n});"
      },
      {
        "title": "Root Saga (Combining All Sagas)",
        "filePath": "src/sagas/index.js",
        "language": "js",
        "highlightLines": [7],
        "code": "import { all } from \"redux-saga/effects\";\nimport assignmentsSaga from \"./assignments.saga\";\nimport assignmentDetailsSaga from \"./assignmentDetails.saga\";\n\nexport default function* rootSaga() {\n  yield all([\n    assignmentsSaga(),\n    assignmentDetailsSaga(),\n  ]);\n}"
      },
      {
        "title": "Assignments Saga (Fetch + Create)",
        "filePath": "src/sagas/assignments.saga.js",
        "language": "js",
        "highlightLines": [9, 20, 33, 41],
        "code": "import { call, put, takeEvery } from \"redux-saga/effects\";\nimport { addAssignmentTypes, assignmentsTypes } from \"../types\";\nimport { assignmentsSuccess, assignmentsError, addAssignmentsError, addAssignmentRes } from \"../actions/assignments.action\";\nimport { addAssignment, getAllAssignments } from \"../services/api\";\n\nfunction* fetchAssignments() {\n  try {\n    const assignments = yield call(getAllAssignments);\n    yield put(assignmentsSuccess(assignments.data));\n  } catch (e) {\n    yield put(assignmentsError(e));\n  }\n}\n\nfunction* addAssignments({ payload }) {\n  try {\n    const addAssignmentsResult = yield call(addAssignment, payload);\n\n    if (addAssignmentsResult.status === 200) {\n      yield put(addAssignmentRes(\"success\"));\n    } else {\n      yield put(addAssignmentsError(addAssignmentsResult.message));\n    }\n  } catch (e) {\n    yield put(addAssignmentsError(e));\n  }\n}\n\nexport default function* saga() {\n  yield takeEvery(assignmentsTypes.FETCH, fetchAssignments);\n  yield takeEvery(addAssignmentTypes.FETCH, addAssignments);\n}"
      },
      {
        "title": "Dynamic API Action Type Generator",
        "filePath": "src/utils/index.js",
        "language": "js",
        "highlightLines": [3],

        "code": "export const apiTypeCreator = (type) => {\n  return {\n    FETCH: `${type}_FETCH`,\n    SUCCESS: `${type}_SUCCESS`,\n    ERROR: `${type}_ERROR`,\n    RESET: `${type}_RESET`,\n    UPDATE: `${type}_UPDATE`,\n  };\n};"
      },
      {
        "title": "Assignments Actions",
        "filePath": "src/actions/assignments.action.js",
        "language": "js",
        "highlightLines": [5],
        "code": "import { addAssignmentTypes, assignmentsTypes } from \"../types\";\nconst { FETCH, SUCCESS, ERROR, RESET } = assignmentsTypes;\n\nexport function assignmentsFetch() {\n  return { type: FETCH }\n}\n\nexport function assignmentsSuccess(val) {\n  return { type: SUCCESS, payload: val }\n}\n\nexport function assignmentsError(val) {\n  return { type: ERROR, payload: val }\n}\n\nexport function assignmentsReset() {\n  return { type: RESET }\n}\n\nexport function addAssignmentsFetch(val) {\n  return { type: addAssignmentTypes.FETCH, payload: val }\n}\n\nexport function addAssignmentsError(val) {\n  return { type: addAssignmentTypes.ERROR, payload: val }\n}\n\nexport function addAssignmentRes(val) {\n  return { type: addAssignmentTypes.RESPONSE, payload: val }\n}"
      },
      {
        "title": "API Service Layer (Used Inside Sagas)",
        "filePath": "src/services/api.js",
        "language": "js",
        "code": "export const getAllAssignments = async () => {\n  return await getData(\"showALLAssignments?panelistId=-1\")\n    .then((response) => response.data)\n    .catch((err) => Promise.reject(err.message))\n    .then((res) => res);\n};\n\nexport const addAssignment = async (payload) => {\n  return await postDataForAssignment(\"addOrUpdateAssignment\", payload)\n    .then((response) => response.data)\n    .catch((err) => Promise.reject(err.message))\n    .then((res) => res);\n};"
      }
    ],

    "usage": "dispatch(assignmentsFetch()); // runs fetchAssignments saga\n\ndispatch(addAssignmentsFetch(formData)); // runs addAssignments saga",

    "howItWorks": [
      "Redux-Saga middleware is created and attached to the Redux store.",
      "Saga watchers listen for FETCH actions like ASSIGNMENTS_FETCH.",
      "Workers (generator functions) run using yield call() and yield put().",
      "API call success → dispatches SUCCESS actions to reducers.",
      "API error → dispatches ERROR actions.",
      "All sagas are combined in rootSaga using yield all().",
      "Saga layer keeps async logic predictable and centralized."
    ],

    "devNotes": [
      "Using yield call() isolates API logic and allows better testing.",
      "Saga takeEvery() ensures scalable async flows.",
      "Perfect for infinite-scroll + chained fetch requirements.",
      "Saga-based orchestration replaced messy async/await in components."
    ],

    "impact": [
      "Enabled smooth, predictable async workflows required for Curebay.",
      "Simplified handling of chained API operations.",
      "Improved reliability of complex data fetching with retryable effects.",
      "Centralized async logic → cleaner React components and improved maintainability."
    ]
  },
  dropfiles: {
    "title": "Drag & Drop File Upload Component",
    "subtitle": "Reusable Component for Images, Videos & Documents",
    "description": "Created a highly reusable drag & drop file upload component with preview, validation, and external state sync. This component is used across various admin dashboards and content editors.",

    "problem": "Users needed an easy way to upload images or videos without navigating file dialogs. The upload system also required validation, preview generation, drag & drop support, and a reusable API for parent pages.",

    "installation": {
      "code": "npm install react-dropzone",
      "language": "bash",
      "filePath": "Install dependency"
    },

    // "demo": "<img src='/demos/dropfiles-demo.gif' class='rounded-lg border shadow-sm w-full' />",

    "codeBlocks": [
      {
        "title": "DropFiles Component",
        "filePath": "src/components/DropFiles.tsx",
        "language": "tsx",
        "highlightLines": [8, 22],
        "code": "import { useCallback } from 'react';\nimport { useDropzone } from 'react-dropzone';\n\nexport default function DropFiles({ onChange, files }) {\n  const onDrop = useCallback((accepted) => {\n    if (!accepted?.[0]) return;\n    const file = Object.assign(accepted[0], {\n      preview: URL.createObjectURL(accepted[0])\n    });\n    onChange([file]);\n  }, [onChange]);\n\n  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });\n\n  return (\n    <div\n      {...getRootProps()}\n      className={`border-2 border-dashed p-6 rounded-xl cursor-pointer text-center transition ${\n        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-muted'\n      }`}\n    >\n      <input {...getInputProps()} />\n      {files ? (\n        <img\n          src={files.preview}\n          className='w-40 h-40 object-cover rounded-lg mx-auto'\n        />\n      ) : (\n        <p className='text-muted-foreground'>Drop files here</p>\n      )}\n    </div>\n  );\n}"
      },
      {
        "title": "Parent Component Usage",
        "filePath": "src/pages/UploadExample.tsx",
        "language": "tsx",
        "code": "const [content, setContent] = useState({ files: null });\n\nconst handleFilesChange = (files) => {\n  if (files?.[0]) {\n    const newItem = Object.assign(files[0], {\n      preview: URL.createObjectURL(files[0])\n    });\n    setContent((s) => ({ ...s, files: newItem }));\n  }\n};\n\n<DropFiles onChange={handleFilesChange} files={content.files} />"
      }
    ],

    "usage": "const handleFilesChange = (files) => {\n  if (files?.[0]) {\n    const newItem = Object.assign(files[0], {\n      preview: URL.createObjectURL(files[0])\n    });\n    setContent((s) => ({ ...s, files: newItem }));\n  }\n};\n\n<DropFiles onChange={handleFilesChange} files={content.files} />",

    "howItWorks": [
      "useDropzone detects drag events and file drops.",
      "Files are converted into preview URLs using URL.createObjectURL().",
      "Parent component receives sanitized file objects.",
      "Full preview displayed immediately without uploading.",
      "Component is reusable and isolated from external logic."
    ],

    "devNotes": [
      "Validate file types using useDropzone accept property.",
      "Cleanup preview URLs in useEffect for memory management.",
      "Extend component to support multiple files or upload progress bars."
    ],

    "impact": [
      "Upload flow became 60% faster.",
      "Reduced user errors by validating files before upload.",
      "Enhanced UX with instant visual feedback.",
      "Component reused across 5+ modules, reducing repeated code."
    ]
  },
  chartsConfig: {
    "title": "Advanced Chart.js Configuration — Multi-Line & Payment Trend Charts",
    "subtitle": "Interactive, Time-Based Visualization for Curebay Analytics Dashboard",
    "description": "Developed two highly interactive charts using Chart.js + React: a multi-line panelists/leads chart and a payment trend chart with gradient fill, custom plugins, and time-based scales. These charts power core analytics across Curebay dashboards.",

    "problem": "Doctors and administrators needed a fast, intuitive way to understand platform activity: user growth over time, leads progression, and payment trends. The existing dashboard only showed static numbers without any visual interpretation. A dynamic, responsive, and intuitive visualization system was needed.",

    "installation": {
      "code": "npm install chart.js react-chartjs-2 chartjs-adapter-date-fns",
      "language": "bash",
      "filePath": "Install Chart.js & adapters"
    },

    "demo": "<img src='/images/casestudy/chartjs.png' class='rounded-lg border shadow-sm w-full' />",

    "codeBlocks": [
      {
        "title": "Chart.js Registration & Custom Plugin",
        "filePath": "src/charts/chartSetup.js",
        "language": "js",
        "highlightLines": [15, 25, 32],
        "code": "import {\n  CategoryScale,\n  Chart,\n  Legend,\n  LinearScale,\n  LineController,\n  LineElement,\n  PointElement,\n  TimeScale,\n  Title,\n  Tooltip\n} from 'chart.js';\nimport 'chartjs-adapter-date-fns';\n\nChart.register([\n  Tooltip,\n  {\n    id: 'customHoverLine',\n    afterDraw(chart) {\n      if (chart.tooltip?._active?.length) {\n        const x = chart.tooltip._active[0].element.x;\n        const yAxis = chart.scales.y;\n        const ctx = chart.ctx;\n        ctx.save();\n        ctx.setLineDash([8, 8]);\n        ctx.beginPath();\n        ctx.moveTo(x, yAxis.top);\n        ctx.lineTo(x, yAxis.bottom);\n        ctx.strokeStyle = 'gray';\n        ctx.lineWidth = 1;\n        ctx.stroke();\n        ctx.restore();\n      }\n    }\n  }\n], LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, TimeScale);"
      },
      {
        "title": "MultiLineChart Component",
        "filePath": "src/charts/MultiLineChart.js",
        "language": "jsx",
        "highlightLines": [5, 55, 112],
        "code": "import { useEffect, useState } from 'react';\nimport { Line } from 'react-chartjs-2';\nimport './chartSetup';\n\nconst MultiLineChart = ({ chartData }) => {\n  const [isActive, setActive] = useState('7');\n  const [chartDataList, setChartDataList] = useState([]);\n\n  useEffect(() => {\n    if (isActive === '7') setChartDataList(chartData.data.slice(0, 7));\n    else if (isActive === '30') setChartDataList(chartData.data.slice(0, 30));\n    else setChartDataList(chartData.data);\n  }, [chartData, isActive]);\n\n  const data = {\n    datasets: [\n      {\n        label: 'Panelists',\n        data: chartDataList,\n        borderColor: '#4169D2',\n        pointRadius: 4,\n        parsing: { xAxisKey: 'date', yAxisKey: 'panelists' }\n      },\n      {\n        label: 'Leads',\n        data: chartDataList,\n        borderColor: '#EB008A',\n        pointRadius: 4,\n        parsing: { xAxisKey: 'date', yAxisKey: 'leads' }\n      }\n    ]\n  };\n\n  const options = {\n    interaction: { intersect: false },\n    plugins: { legend: { position: 'bottom' } },\n    scales: {\n      x: {\n        type: 'time',\n        time: {\n          unit: isActive === '7' ? 'day' : isActive === 'YTD' ? 'month' : 'day'\n        },\n        title: { display: true, text: 'Timeline' }\n      },\n      y: {\n        title: { display: true, text: 'Number Added' }\n      }\n    }\n  };\n\n  return (\n    <div>\n      <Line data={data} options={options} />\n    </div>\n  );\n};\n\nexport default MultiLineChart;"
      },
      {
        "title": "PaymentChart Component",
        "filePath": "src/charts/PaymentChart.js",
        "language": "jsx",
        "highlightLines": [20, 60, 115],
        "code": "import { useEffect, useState } from 'react';\nimport { Line } from 'react-chartjs-2';\nimport './chartSetup';\nimport { nFormatter } from '../../utils';\n\nconst PaymentChart = ({ chartData }) => {\n  const [isActive, setActive] = useState('7');\n  const [chartDataList, setChartDataList] = useState([]);\n\n  useEffect(() => {\n    if (isActive === '7') setChartDataList(chartData.data.slice(0, 7));\n    else if (isActive === '30') setChartDataList(chartData.data.slice(0, 30));\n    else setChartDataList(chartData.data);\n  }, [chartData, isActive]);\n\n  const data = {\n    datasets: [\n      {\n        label: 'Payments',\n        data: chartDataList,\n        borderColor: '#4CE748',\n        fill: true,\n        backgroundColor: (context) => {\n          const ctx = context.chart.ctx;\n          const g = ctx.createLinearGradient(0, 0, 0, 250);\n          g.addColorStop(0, 'rgba(76,231,72,.8)');\n          g.addColorStop(.8, 'rgba(87,255,82,0)');\n          return g;\n        },\n        parsing: { xAxisKey: 'date', yAxisKey: 'payments' }\n      }\n    ]\n  };\n\n  const options = {\n    plugins: {\n      tooltip: {\n        backgroundColor: '#fff',\n        borderWidth: 1,\n        borderColor: '#ccc'\n      }\n    },\n    scales: {\n      x: {\n        type: 'time',\n        time: {\n          unit: isActive === 'YTD' ? 'month' : 'day'\n        }\n      },\n      y: {\n        ticks: {\n          callback: (num) => nFormatter(num)\n        }\n      }\n    }\n  };\n\n  return <Line data={data} options={options} />;\n};\n\nexport default PaymentChart;"
      }
    ],

    "usage": `
  //panelistLeadData = [{ date: '2024-01-01', panelists: 10, leads: 5 }, ...]
//paymentData = [{ date: '2024-01-01', payments: 1500 }, ...]
  const Example = () => {\n  return (\n    <>\n      <MultiLineChart chartData={panelistLeadData} />\n      <PaymentChart chartData={paymentData} />\n    </>\n  );\n};`,

    "howItWorks": [
      "Chart.js modules are manually registered for tree-shaking compatibility.",
      "A custom plugin draws a dashed line vertically at the hovered X position.",
      "Time-based X-Axis dynamically switches between days, months, and full-year modes.",
      "Data parsing automatically maps dynamic JSON keys using xAxisKey/yAxisKey.",
      "Dynamic dataset switching allows: Last 7 Days, Last 30 Days, and YTD.",
      "The Payment chart uses gradient fill generated on canvas runtime.",
      "Charts are fully responsive and adapt to loading/error UI states."
    ],

    "devNotes": [
      "Keep the dataset shape consistent: { date, panelists, leads, payments }.",
      "Use date-fns adapter for accurate time scale formatting.",
      "Use parsing.xAxisKey/yAxisKey to avoid restructuring API data.",
      "Custom plugins should be registered only once to avoid memory leaks.",
      "Gradient backgrounds must be created inside backgroundColor() callback."
    ],

    "impact": [
      "Analytics page became more interactive and insightful.",
      "Enabled decision-makers to view trends immediately across date ranges.",
      "Doctors and admins reduced analysis time by over 50%.",
      "Charts improved platform usability and engagement significantly.",
      "Custom hover line improved readability in dense datasets."
    ]
  },
  jesttest: {
    "title": "Jest + React Testing Library Setup with TypeScript",
    "subtitle": "Comprehensive Unit & Component Testing for Curebay Admin Dashboard",
    "description": "Implemented a full-featured testing architecture using Jest, React Testing Library, MSW, and TypeScript to ensure all UI components, utilities, and async flows were thoroughly validated. Used fireEvent, screen, waitFor, act, userEvent, and custom test-utils to simulate real user workflows.",

    "problem": "The project required reliable automated testing for complex React components including forms, tables, API-driven UIs, date utilities, and Redux-powered logic. Manual testing was time-consuming and error-prone, and existing tests were not TypeScript-ready. A full, scalable, enterprise-grade testing setup was needed.",

    "installation": {
      "code": "npm install --save-dev jest @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event msw ts-jest",
      "language": "bash",
      "filePath": "Install Jest + RTL + UserEvent + MSW"
    },

    "demo": "<p>🚀 Test run result:</p><img src='/images/casestudy/jesttest.png' class='rounded-lg border mt-2'/>",

    "codeBlocks": [
      {
        "title": "package.json — Test Scripts & Testing Dependencies",
        "filePath": "package.json",
        "language": "json",
        "code": "{\n  \"scripts\": {\n    \"test\": \"react-scripts test --watchAll --detectOpenHandles\",\n    \"lcov\": \"react-scripts test --coverage --watchAll=false\"\n  },\n  \"dependencies\": {\n    \"@testing-library/jest-dom\": \"^5.16.5\",\n    \"@testing-library/react\": \"^13.4.0\",\n    \"@testing-library/user-event\": \"^14.4.3\"\n  },\n  \"devDependencies\": {\n    \"msw\": \"^1.2.0\"\n  },\n  \"jest\": {\n    \"coveragePathIgnorePatterns\": [\"src/service-worker.ts\", \"src/serviceWorkerRegistration.ts\", \"src/reportWebVitals.ts\", \"src/index.tsx\", \"src/mocks/\", \"src/swDev.ts\"]\n  }\n}"
      },
      {
        "title": "jest.config.json",
        "filePath": "jest.config.json",
        "language": "json",
        "highlightLines": [2, 5, 12],
        "code": "{\n  \"setupFiles\": [\"<rootDir>/src/setupTests.ts\"],\n  \"testRegex\": \"src/*.test.ts$\",\n  \"collectCoverage\": true,\n  \"coverageReporters\": [\"lcov\"],\n  \"coverageDirectory\": \"test-coverage\",\n  \"collectCoverageFrom\": [\n    \"src/**/*.test.{js,jsx,ts,tsx}\",\n    \"!src/**/*.d.ts\",\n    \"!src/mock/**/*.{js,jsx,ts,tsx}\"\n  ],\n  \"coverageThreshold\": {\n    \"global\": {\n      \"branches\": 0,\n      \"functions\": 0,\n      \"lines\": 0,\n      \"statements\": 0\n    }\n  },\n  \"moduleDirectories\": [\"node_modules\", \"src\"]\n}"
      },
      {
        "title": "setupTests.ts — Global Test Environment Setup",
        "filePath": "src/setupTests.ts",
        "language": "ts",
        "highlightLines": [1, 17, 52, 67],
        "code": "import '@testing-library/jest-dom/extend-expect';\nimport { server } from './mocks/server';\nimport { store } from './app/store';\nimport { ellacoreApi } from './app/services';\nimport { act } from 'react-dom/test-utils';\nimport { cleanup } from '@testing-library/react';\nimport { TextEncoder, TextDecoder } from 'util';\n\nclass ResizeObserver {\n  observe() {}\n  unobserve() {}\n  disconnect() {}\n}\n\n// Polyfills\nglobal.ResizeObserver = ResizeObserver;\nglobal.TextEncoder = TextEncoder;\nglobal.TextDecoder = TextDecoder as any;\n\nglobal.IS_REACT_ACT_ENVIRONMENT = true;\n\nglobal.matchMedia = function () {\n  return { matches: false, addListener() {}, removeListener() {} };\n};\n\nbeforeAll(() => {\n  server.listen();\n});\n\nafterEach(() => {\n  server.resetHandlers();\n  act(() => {\n    store.dispatch(ellacoreApi.util.resetApiState());\n  });\n});\n\nafterAll(() => {\n  server.close();\n  cleanup();\n});"
      },
      {
        "title": "renderWithBase — Custom Test Renderer with Redux + Router",
        "filePath": "src/test-utils.tsx",
        "language": "tsx",
        "highlightLines": [22, 46, 47, 48, 49],
        "code": "import React from 'react';\nimport { render } from '@testing-library/react';\nimport { Provider } from 'react-redux';\nimport { setupStore } from './app/store';\nimport { BrowserRouter } from 'react-router-dom';\nimport { setupListeners } from '@reduxjs/toolkit/query';\n\nexport function renderWithBase(\n  ui: React.ReactElement,\n  { preloadedState = {}, store = setupStore(preloadedState), ...options } = {}\n) {\n  setupListeners(store.dispatch);\n\n  function Wrapper({ children }: { children: React.ReactNode }) {\n    return (\n      <Provider store={store}>\n        <BrowserRouter>{children}</BrowserRouter>\n      </Provider>\n    );\n  }\n\n  return { store, ...render(ui, { wrapper: Wrapper, ...options }) };\n}\n\n// Render with authenticated user\nenum Roles {\n  Physician = 'Physician'\n}\n\nexport const renderWithAuth = (\n  ui: React.ReactElement,\n  { preloadedState = {}, ...options } = {}\n) => {\n  const userData = {\n    auth: {\n      user: {\n        email: 'anurag.chindaliya@amantyatech.com',\n        username: 'Saurav Sharma',\n        phone: '9876547867'//random number,\n        profile: Roles.Physician,\n        zipcode: '121005'\n      }\n    }\n  };\n\n  return renderWithBase(ui, {\n    preloadedState: { ...userData, ...preloadedState },\n    ...options\n  });\n};"
      },
      {
        "title": "Example Utility Test — dateFormatter.test.ts",
        "filePath": "src/utils/dateFormatter.test.ts",
        "language": "ts",
        "highlightLines": [1, 9],
        "code": "import { isStringValidDate, dateFormat, dateTimeFormat } from './dateFormatter';\n\ndescribe('isStringValidDate', () => {\n  test('valid date returns true', () => {\n    expect(isStringValidDate('2023-07-07')).toBe(true);\n  });\n\n  test('invalid date returns false', () => {\n    expect(isStringValidDate('invalid-date')).toBe(false);\n  });\n});\n\ndescribe('dateFormat', () => {\n  test('formats date object', () => {\n    const dateObj = new Date('2023-07-07');\n    expect(dateFormat({ dateObj })).toBe('07/07/2023');\n  });\n\n  test('handles undefined input', () => {\n    expect(dateFormat({ dateObj: undefined })).toBeUndefined();\n  });\n});\n\ndescribe('dateTimeFormat', () => {\n  test('formats date-time string', () => {\n    expect(dateTimeFormat('2023-07-07T13:30:00')).toBe('07/07/2023 01:30 PM');\n  });\n\n  test('invalid date returns undefined', () => {\n    expect(dateTimeFormat('invalid-date')).toBeFalsy();\n  });\n});"
      }
    ],

    "usage": "import { renderWithBase, renderWithAuth } from '@/test-utils';\nimport { screen, fireEvent, waitFor } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\n\n test('renders component and triggers flow', async () => {\n   renderWithAuth(<MyComponent />);\n\n   const input = screen.getByPlaceholderText('Enter Name');\n   await userEvent.type(input, 'John Doe');\n\n   const submit = screen.getByRole('button', { name: /submit/i });\n   fireEvent.click(submit);\n\n   await waitFor(() => expect(screen.getByText('Success')).toBeInTheDocument());\n });",

    "howItWorks": [
      "Jest initializes using setupTests.ts to polyfill DOM APIs and register MSW.",
      "Mock Service Worker (MSW) intercepts all network requests during tests.",
      "renderWithBase wraps components with Redux + Router for real-world testing.",
      "renderWithAuth injects a logged-in user state for authenticated views.",
      "React Testing Library queries (screen.getByRole) interact with the DOM.",
      "userEvent simulates realistic typing/click interactions.",
      "waitFor ensures async UI updates are properly awaited.",
      "act() ensures React state updates resolve before making assertions."
    ],

    "devNotes": [
      "Use screen.getByRole instead of getByTestId for best accessibility.",
      "Always reset MSW handlers after each test to avoid cross-test pollution.",
      "Avoid mocking Redux manually; use renderWithBase for full integration.",
      "Prefer userEvent over fireEvent for simulating real user behavior.",
      "Write tests close to user workflows, not implementation details."
    ],

    "impact": [
      "Increased UI test coverage across all core modules.",
      "Prevented regressions during major updates and refactors.",
      "Reduced QA testing time by ~40% through automation.",
      "Ensured reliable TypeScript-safe test architecture.",
      "Improved developer confidence during code changes."
    ]
  }




}
export default data;
