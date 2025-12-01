import { CaseStudy } from "../types/case-study";

const data: CaseStudy[] = [
  {
    "slug": "dynamic-form-engine-formio",
    "title": "Dynamic Form Engine using Form.io",
    "subtitle": "Schema Driven Forms for Large-Scale Workflows",
    "description": "A fully dynamic form system using Form.io, allowing admins to configure fields, validation, conditional logic and API calls without redeployment.",
    "problem": "Different workflows required different forms, making hardcoded UI unscalable.",
    "installation": {
      "code": "npm install @formio/react @formio/js",
      "language": "bash"
    }
  },
  {
    "slug": "tailwind-theme-preset-configuration",
    "title": "Advanced Tailwind Theme Preset Configuration",
    "subtitle": "Scalable Design System using Tokens",
    "description": "Created a theme preset using Tailwind, CSS variables, design tokens, custom fonts, scrollbars, utilities, and reusable cn() helper.",
    "problem": "Default Tailwind colors and styles were insufficient for a custom brand system.",
    "installation": {
      "code": "npm install tailwindcss @tailwindcss/line-clamp tailwind-scrollbar tailwind-merge clsx",
      "language": "bash"
    }
  },
  {
    "slug": "jest-react-testing-library-typescript",
    "title": "Jest + React Testing Library with TypeScript",
    "subtitle": "Enterprise-Level Component, Utility & Async Testing",
    "description": "Created a full testing environment using Jest, MSW, RTL, and TypeScript with complete UI and async workflow testing.",
    "problem": "The application required strong test coverage for components, utilities, async logic, and API flows.",
    "installation": {
      "code": "npm install --save-dev jest @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event msw ts-jest",
      "language": "bash"
    }
  },
  {
    "slug": "mock-service-worker-msw",
    "title": "Mock Service Worker (MSW) — Contract-First API Development",
    "subtitle": "Simulating REST APIs Before Backend Availability",
    "description": "Implemented MSW to create a complete UI experience before backend APIs existed. Later, shared the mocked contract with backend developers.",
    "problem": "Backend APIs weren't ready, but UI development needed to continue smoothly.",
    "installation": {
      "code": "npm install msw --save-dev\nnpx msw init public",
      "language": "bash"
    }
  },
  {
    "slug": "infinite-scroll-intersection-observer",
    "title": "Infinite Scroll with IntersectionObserver",
    "subtitle": "Seamless Data Loading Experience",
    "description": "A smooth infinite scrolling experience built using React, Redux-Saga, and the IntersectionObserver API. Designed to load large datasets dynamically without pagination interruptions.",
    "problem": "Users needed a fast way to browse large datasets without clicking pagination buttons. Traditional pagination broke the flow and led to slow navigation.",
    "installation": {
      "title": "Install Packages",
      "code": "No installation required — this solution uses the native IntersectionObserver API built into modern browsers.",
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
        "title": "Redux-Saga Infinite Scroll Trigger",
        "filePath": "src/pages/LeadsContainer.tsx",
        "language": "tsx",
        "code": "import { useDispatch, useSelector } from \"react-redux\";\nimport { useInfiniteScroll } from \"@/hooks/useInfiniteScroll\";\nimport { loadData, loadMoreData } from \"@/actions/data.actions\";\n\nexport default function LeadsContainer() {\n  const dispatch = useDispatch();\n  const state = useSelector((store) => store.dataList);\n\n  const lastRowRef = useInfiniteScroll({\n    loading: state.loading || state.moreLoading,\n    hasMore: state.hasMore,\n    onLoadMore: () => dispatch(loadMoreData()),\n    deps: [state.pageNumber]\n  });\n\n  return (\n    <table>\n      <tbody>\n        {state.data.map((item, index) => (\n          <tr key={item.id} ref={index === state.data.length - 1 ? lastRowRef : null}>\n            <td>{item.name}</td>\n          </tr>\n        ))}\n      </tbody>\n    </table>\n  );\n}"
      }
    ],
    "usage": "const lastRowRef = useInfiniteScroll({ loading: state.loading, hasMore: state.hasMore, onLoadMore: () => dispatch(loadMoreData()), deps: [state.pageNumber] });",
    "howItWorks": [
      "The last table row receives a ref from the useInfiniteScroll hook.",
      "IntersectionObserver tracks when the row is visible in viewport.",
      "When visible, it triggers Redux-Saga to fetch more data.",
      "New data is appended and observer attaches to new last row."
    ],
    "devNotes": [
      "Always disconnect observer before re-attaching.",
      "Ensure loading flag prevents multiple triggers.",
      "Use small datasets (10–20 rows) for smooth UX.",
      "IntersectionObserver is more efficient than scroll events."
    ],
    "impact": [
      "Reduced navigation time by 40%.",
      "Removed need for pagination controls.",
      "Improved UX for browsing large datasets.",
      "Enabled seamless, modern loading experience."
    ]
  },
  {
    "slug": "redux-saga-configuration-async-workflow",
    "title": "Redux-Saga Configuration & Async Workflow Architecture",
    "subtitle": "Scalable Async Operations with Sagas",
    "description": "A structured async layer using Redux-Saga to handle complex workflows, chained APIs, infinite scroll, error handling, and background tasks using generator-based side effects.",
    "problem": "The application required orchestrating multiple chained API calls, handling conditional workflows, and managing async behavior cleanly. Redux-Thunk was not ideal for these requirements.",
    "demo": "<img src='/images/casestudy/dashboard.png' class='rounded-lg border shadow-sm w-full' />",
    "installation": {
      "title": "Install Redux-Saga",
      "code": "npm install redux react-redux redux-saga",
      "language": "bash",
      "filePath": "Install packages"
    },
    "codeBlocks": [
      {
        "title": "Redux Store With Saga Middleware",
        "filePath": "src/store.js",
        "language": "js",
        "code": "import { applyMiddleware, compose, createStore } from \"redux\";\nimport createSagaMiddleware from \"@redux-saga/core\";\nimport rootReducer from \"./reducers\";\nimport sagas from \"./sagas\";\n\nconst sagaMiddleware = createSagaMiddleware();\n\nconst store = createStore(\n  rootReducer,\n  compose(applyMiddleware(sagaMiddleware))\n);\n\nsagaMiddleware.run(sagas);\nexport default store;"
      }
    ],
    "usage": "dispatch(fetchAction()); // triggers Saga workflow",
    "howItWorks": [
      "Saga middleware listens for dispatched async actions.",
      "Workers use generator functions + yield call() for async tasks.",
      "yield put() dispatches results back to reducers.",
      "Saga watchers orchestrate workflows cleanly."
    ],
    "devNotes": [
      "Sagas improve readability of complex async flows.",
      "yield call() enables testable API logic.",
      "Saga watchers help group async behavior in one place."
    ],
    "impact": [
      "Predictable async workflows.",
      "Improved maintainability.",
      "Simplified handling of multiple dependent API calls."
    ]
  },

  {
    "slug": "dropfiles-component",
    "title": "Drag & Drop File Upload Component",
    "subtitle": "Reusable Component for Images, Videos & Documents",
    "description": "A drag-and-drop file upload component with preview, validation, and external state sync. Used across multiple dashboards.",
    "problem": "Users needed a faster, modern way to upload files without navigating through dialog boxes.",
    "installation": {
      "code": "npm install react-dropzone",
      "language": "bash",
      "filePath": "Install dependency"
    },
    "codeBlocks": [
      {
        "title": "DropFiles Component",
        "filePath": "src/components/DropFiles.tsx",
        "language": "tsx",
        "code": "import { useCallback } from 'react';\nimport { useDropzone } from 'react-dropzone';\n\nexport default function DropFiles({ onChange, files }) {\n  const onDrop = useCallback((accepted) => {\n    if (!accepted?.[0]) return;\n    const file = Object.assign(accepted[0], {\n      preview: URL.createObjectURL(accepted[0])\n    });\n    onChange([file]);\n  }, [onChange]);\n\n  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });\n\n  return (\n    <div {...getRootProps()} className={`border-2 border-dashed p-6 rounded-xl cursor-pointer ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}>\n      <input {...getInputProps()} />\n      {files ? <img src={files.preview} class='w-40 h-40 object-cover' /> : 'Drop files here'}\n    </div>\n  );\n}"
      }
    ],
    "usage": "<DropFiles onChange={handleFilesChange} files={content.files} />",
    "impact": [
      "Upload flow became faster.",
      "Reduced UX friction.",
      "Component reused across multiple modules."
    ]
  },

  {
    "slug": "chartsjs-advanced-configuration",
    "title": "Advanced Chart.js Configuration",
    "subtitle": "Multi-Line & Trend Visualization",
    "description": "Interactive charts built using Chart.js with dynamic datasets, hover indicators, gradient fills, and time scaling.",
    "problem": "The dashboard required visual insights for trends and analytics using dynamic charts.",
    "installation": {
      "code": "npm install chart.js react-chartjs-2 chartjs-adapter-date-fns",
      "language": "bash"
    }
  },




  {
    "slug": "end-to-end-deployment-pipeline",
    "title": "End-to-End Deployment Pipeline",
    "subtitle": "CI/CD Workflow Across Dev → Staging → Production",
    "description": "Built a structured deployment pipeline using Git branching, CI/CD workflows, environment configs, and automated promotion.",
    "problem": "Releases were unstable due to direct commits to main and lack of environment separation."
  },


  {
    "slug": "otp-verification-form-with-countdown-timer",
    "title": "OTP Verification Form with Countdown Timer",
    "subtitle": "Secure Login Flow with Timer & Zod Validation",
    "description": "A secure OTP-based login system using React Hook Form, Zod, countdown timers, and RTK Query API validation.",
    "problem": "The application required a secure OTP system with resend blocking and strict validation.",
    "installation": {
      "code": "npm install react-hook-form @hookform/resolvers zod react-countdown-hook react-toastify @reduxjs/toolkit react-redux",
      "language": "bash"
    }
  }
]

export default data;
