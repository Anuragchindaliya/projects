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
  }

}
export default data;
