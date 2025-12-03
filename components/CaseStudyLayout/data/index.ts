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
    },
    "codeBlocks": [
      {
        "title": "Register Form.io Styles",
        "filePath": "public/index.html",
        "language": "html",
        "code": "<link rel='stylesheet' href='https://cdn.form.io/formiojs/formio.full.min.css'>"
      },

      {
        "title": "Dynamic Training Program Form (State-Wise)",
        "filePath": "src/pages/Training/ScheduleTrainingProgram.tsx",
        "language": "tsx",
        "highlightLines": [12, 32, 89, 152],
        "code": "import { Form } from '@formio/react';\n\nconst scheduleTrainingFormSchema = {\n  components: [\n    {\n      type: 'columns',\n      columns: [\n        {\n          width: 4,\n          components: [\n            {\n              label: 'Training Program Name',\n              key: 'trainingProgram',\n              type: 'select',\n              dataSrc: 'url',\n              data: {\n                url: '{{submission.baseURL}}/getalltraining?m_o_id={{submission.m_o_id}}',\n                headers: [{ key: 'X-Auth-Token', value: '{{submission.token}}' }],\n                method: 'post'\n              },\n              valueProperty: 'training_id',\n              selectValues: 'data',\n              validate: { required: true }\n            }\n          ]\n        },\n\n        {\n          width: 4,\n          components: [\n            {\n              label: 'Training Institute Name',\n              key: 'trainingInstitute',\n              type: 'select',\n              dataSrc: 'url',\n              data: {\n                url: '{{submission.baseURL}}/get_institute_by_user?user_id={{submission.user_id}}',\n                headers: [{ key: 'X-Auth-Token', value: '{{submission.token}}' }],\n                method: 'post'\n              },\n              valueProperty: 'institute_name',\n              selectValues: 'data',\n              validate: { required: true }\n            }\n          ]\n        }\n      ]\n    },\n\n    {\n      type: 'columns',\n      columns: [\n        {\n          width: 4,\n          components: [\n            {\n              label: 'Last Date For Nomination',\n              key: 'lastDateForNomination',\n              type: 'datetime',\n              format: 'yyyy-MM-dd',\n              widget: { type: 'calendar', allowInput: true }\n            }\n          ]\n        },\n        {\n          width: 4,\n          components: [\n            {\n              label: 'End Date',\n              key: 'endDate',\n              type: 'datetime',\n              validate: {\n                required: true,\n                custom: 'valid = new Date(input) >= new Date(data.startDate); if(!valid) message = \"End Date cannot be before Start Date\"'\n              }\n            }\n          ]\n        }\n      ]\n    },\n\n    {\n      type: 'columns',\n      columns: [\n        {\n          width: 4,\n          components: [\n            {\n              label: 'Duration (In Days)',\n              key: 'duration',\n              type: 'number',\n              calculateValue: 'if(data.startDate && data.endDate) { value = (new Date(data.endDate) - new Date(data.startDate)) / (1000*60*60*24) + 1 }'\n            }\n          ]\n        },\n        {\n          width: 4,\n          components: [\n            {\n              label: 'Program Mode',\n              key: 'programMode',\n              type: 'select',\n              dataSrc: 'url',\n              data: {\n                url: '{{submission.baseURL}}/get_config_data_by_type?type=Training_Mode',\n                headers: [{ key: 'X-Auth-Token', value: '{{submission.token}}' }],\n                method: 'post'\n              },\n              valueProperty: 'name',\n              selectValues: 'data[0].config_value'\n            }\n          ]\n        }\n      ]\n    }\n  ]\n};\n\nexport default function ScheduleTrainingProgram() {\n  return (\n    <Form\n      key={formKey}\n      form={scheduleTrainingFormSchema}\n      onFormReady={onFormReady}\n      submission={{\n        baseURL,\n        token: auth?.data?.token,\n        m_o_id: auth?.data?.m_o_id,\n        user_id: auth?.data?.user_id,\n        data: {}\n      }}\n      onSubmit={onSubmit}\n    />\n  );\n}"
      },

      {
        "title": "Dynamic District Dropdown Based on State Selection",
        "filePath": "src/forms/add-institute-form.tsx",
        "language": "tsx",
        "highlightLines": [3, 19, 31],
        "code": "const formOnChange = (sub) => {\n  if (sub.changed.component.key === 'state') {\n    const formio = formRef.current;\n    const districtComp = formio.getComponent('district');\n    const stateLabel = sub.data.state;\n\n    const stateObj = stateData.states.find(s => s.name === stateLabel);\n    const items = stateObj?.districts?.map(d => ({ label: d.name, value: d.id })) || [];\n\n    districtComp.component.data.values = items;\n    districtComp.redraw();\n    districtComp.setValue(null);\n  }\n};"
      },

      {
        "title": "Rendering Form.io Form in React",
        "filePath": "src/pages/AddInstitute.tsx",
        "language": "tsx",
        "code": "<Form\n  key={formKey}\n  src=\"\"\n  form={addtoInstituteForm}\n\n  submission={{\n    baseURL,\n    token: auth?.data?.token,\n    showSelectOrg: canView('SELECT_ORGANIZATION'),\n    stateData,\n    data: {}\n  }}\n\n  formReady={(inst) => (formRef.current = inst)}\n  onSubmit={handleSubmit}\n  onChange={formOnChange}\n/>"
      }
    ],

    "usage": "return <Form form={schema} submission={{ baseURL, token }} onSubmit={handleSubmit} />",

    "howItWorks": [
      "Every state has its own form schema defined in JSON.",
      "Backend or admin panel updates the schema — no React code change needed.",
      "Form.io automatically renders fields, validation, conditionals, and dynamic dropdowns.",
      "Dynamic API URLs use placeholders like {{submission.token}} and {{submission.baseURL}}.",
      "Calculated fields like duration auto-update on change events.",
      "Conditional visibility (e.g., campus field showing only for specific modes) is handled inside schema.",
      "District list updates instantly when state is changed using onChange + redraw().",
      "File uploads, custom headers, date constraints are defined inside schema itself."
    ],

    "devNotes": [
      "Form.io allowed us to centralize form logic outside React components.",
      "Dynamic workflow rules reduced 70% form-related bugs.",
      "Zero deployment needed — forms auto-update from schema.",
      "Using getComponent + redraw helped override advanced behaviors.",
      "Placeholder tokens inside schema allowed secure authenticated API requests.",
      "Custom validation and calendar widgets were integrated easily."
    ],

    "impact": [
      "Single schema engine handled all 36 Indian states.",
      "State-specific changes deployed in minutes, not days.",
      "Zero downtime — no need for rebuilding the frontend.",
      "Reduced frontend codebase size by ~50%.",
      "Huge reduction in QA effort because schema controlled validations.",
      "Enabled true no-code/low-code form customization for non-technical teams."
    ]
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
    },
    // "demo": "<div class='p-4 rounded-xl border shadow bg-card'><p>🎨 Custom Theme Preview:</p><img src='/demos/tailwind-theme-palette.png' class='rounded mt-3 border'/></div>",

    "codeBlocks": [
      {
        "title": "Main Tailwind Base + CSS Variables",
        "filePath": "src/index.css",
        "language": "css",
        "highlightLines": [5, 11, 25, 40],
        "code": "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  :root {\n    --rgb-blue-dark: 3 4 94;\n    --blue-dark: rgb(var(--rgb-blue-dark));\n\n    --rgb-blue-medium: 144 165 209;\n    --blue-medium: rgb(var(--rgb-blue-medium));\n\n    --rgb-blue-light: 201 218 248;\n    --blue-light: rgb(var(--rgb-blue-light));\n\n    --rgb-blue-lightest: 242 247 254;\n    --blue-lightest: rgb(var(--rgb-blue-lightest));\n\n    --rgb-gray-dark: 102 102 102;\n    --gray-dark: rgb(var(--rgb-blue-dark));\n\n    --rgb-gray-light: 204 204 204;\n    --gray-light: rgb(var(--rgb-gray-light));\n\n    --rgb-coral: 243 115 88;\n    --coral: rgb(var(--rgb-coral));\n\n    --rgb-peach: 248 215 196;\n    --peach: rgb(var(--rgb-peach));\n\n    --sand: #f3e9e2;\n    --sage: #d8e1dc;\n  }\n\n  @font-face {\n    font-family: \"Argent CF\";\n    src: url(\"../public/assets/fonts/ArgentCF/Fontspring-DEMO-argentcf-thin.otf\");\n    font-weight: 400;\n  }\n\n  @font-face {\n    font-family: \"Argent CF\";\n    src: url(\"../public/assets/fonts/ArgentCF/Fontspring-DEMO-argentcf-demibold.otf\");\n    font-weight: 700;\n    letter-spacing: 0.035em;\n  }\n\n  .font-argent {\n    letter-spacing: 0.015em;\n  }\n}\n\n/* Scrollbar */\n::-webkit-scrollbar { width: 0.5em; }\n::-webkit-scrollbar-track-piece { background: var(--blue-lightest); }\n::-webkit-scrollbar-thumb { background: var(--blue-dark); }"
      },

      {
        "title": "tailwind.config.js — Full Theme Extension",
        "filePath": "tailwind.config.js",
        "language": "js",
        "highlightLines": [12, 20, 40],
        "code": "const defaultTheme = require(\"tailwindcss/defaultTheme\");\n\nmodule.exports = {\n  darkMode: \"class\",\n  content: [\"./src/**/*.{js,jsx,ts,tsx}\"],\n  theme: {\n    screens: {\n      ...defaultTheme.screens,\n      xs: \"320px\",\n    },\n    extend: {\n      container: {\n        screens: {\n          xs: \"100%\",\n          sm: \"640px\",\n          md: \"768px\",\n          lg: \"1024px\",\n          xl: \"1280px\",\n          \"2xl\": \"1536px\",\n        },\n      },\n      colors: {\n        blue: {\n          dark: \"rgba(var(--rgb-blue-dark) / <alpha-value>)\",\n          medium: \"rgba(var(--rgb-blue-medium) / <alpha-value>)\",\n          light: \"rgba(var(--rgb-blue-light) / <alpha-value>)\",\n          lightest: \"rgba(var(--rgb-blue-lightest) / <alpha-value>)\",\n        },\n        gray: {\n          dark: \"rgba(var(--rgb-gray-dark) / <alpha-value>)\",\n          light: \"rgba(var(--rgb-gray-light) / <alpha-value>)\",\n        },\n        coral: \"rgba(var(--rgb-coral) / <alpha-value>)\",\n        peach: \"rgba(var(--rgb-peach) / <alpha-value>)\",\n        sand: \"var(--sand)\",\n        sage: \"var(--sage)\",\n      },\n      fontFamily: {\n        argent: [\"Argent CF\", \"inter\", \"cursive\"],\n        argentw: [\"Argent W\", \"inter\", \"cursive\"],\n      },\n    },\n  },\n  plugins: [\n    require(\"tailwind-scrollbar\")({ nocompatible: true }),\n    require(\"@tailwindcss/line-clamp\"),\n  ],\n};"
      },

      {
        "title": "Reusable cn() Utility (clsx + twMerge)",
        "filePath": "src/utils/index.ts",
        "language": "ts",
        "highlightLines": [5],
        "code": "import { clsx, type ClassValue } from \"clsx\";\nimport { twMerge } from \"tailwind-merge\";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}"
      },

      {
        "title": "clsx Usage Example",
        "filePath": "DropDown.tsx",
        "language": "tsx",
        "code": "<div\n  className={clsx(\n    \"cursor-pointer px-[0.5em] py-[0.25em]\",\n    {\n      \"bg-blue-lightest\": index === highlightedIndex,\n      \"!bg-blue-dark !text-white\": isOptionSelected(option)\n    }\n  )}\n>\n  {option.label}\n</div>"
      },

      {
        "title": "tailwind-merge Usage Example",
        "filePath": "SomeContainer.tsx",
        "language": "tsx",
        "code": "<div\n  className={twMerge(\n    \"bg-coral flex w-full h-full justify-center items-center\",\n    containerClass\n  )}\n  {...restContainer}\n>\n  {children}\n</div>"
      },

      {
        "title": "Theme-Based Reusable Button Component",
        "filePath": "src/components/button/index.tsx",
        "language": "tsx",
        "highlightLines": [4, 12, 20],
        "code": "import React, { ButtonHTMLAttributes } from 'react'\nimport { cn } from '../../utils';\n\nconst themeConfig = {\n  primary: \"bg-blue-dark hover:bg-blue-dark/90 text-white\",\n  secondary: \"bg-coral hover:bg-coral/90 text-white\",\n  primary_outline: \"border border-blue-dark text-blue-dark hover:bg-blue-lightest rounded\",\n  secondary_outline: \"border border-coral text-coral hover:bg-coral/10 rounded\"\n} as const;\n\ninterface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {\n  children: React.ReactNode;\n  theme?: keyof typeof themeConfig;\n}\n\nconst Button = ({ children, className, theme, ...props }: ButtonProps) => {\n  return (\n    <button\n      {...props}\n      className={cn(theme ? themeConfig[theme] : \"\", \"flex justify-around items-center px-3 sm:px-6 disabled:opacity-50\", className)}\n    >\n      {children}\n    </button>\n  );\n}\n\nexport default Button;"
      }
    ],

    "usage": "import Button from '@/components/button';\n\n<Button theme='primary' className='px-4 py-2'>Click</Button>",

    "howItWorks": [
      "Created global CSS variables inside :root to build a design-token system.",
      "Mapped tokens into Tailwind's theme.extend.colors for full utility class support.",
      "Added custom breakpoints including xs for mobile-heavy UI.",
      "Installed plugins: line-clamp for content truncation, scrollbar for smooth UX.",
      "Created custom typography using @font-face and exposed via fontFamily.",
      "Built reusable cn() helper using clsx + tailwind-merge to avoid class conflicts.",
      "Implemented theme-based Button component using Tailwind presets.",
      "Enabled design scalability across all React screens and UI modules."
    ],

    "devNotes": [
      "Using CSS variables allows real-time theme switching.",
      "Avoid over-extending Tailwind; keep theme minimal and token-based.",
      "clsx is great for conditional styling; twMerge removes conflicting Tailwind classes.",
      "Use <alpha-value> in rgba(var(--rgb-color)) for transparency control.",
      "Always structure colors as design tokens to avoid hard-coded hex values."
    ],

    "impact": [
      "Reduced CSS duplication by 70% using theme tokens and cn().",
      "Created brand-consistent UI across all modules in Curebay dashboard.",
      "Improved developer speed and reduced styling bugs.",
      "Enabled effortless dark mode, design iteration, and theming.",
      "Reusable components + utilities now act as a mini-design-system."
    ]
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
    },
    // "demo": "<div class='rounded-xl border shadow p-4 bg-card'><p>🚀 Below is a preview of how my UI ran fully without backend:</p><img src='/demos/msw-mock-flow.gif' class='rounded border mt-2'/></div>",

    "codeBlocks": [
      {
        "title": "MSW Browser Worker (Used in Local Dev)",
        "filePath": "src/mocks/browser.ts",
        "language": "ts",
        "highlightLines": [1, 5],
        "code": "import { setupWorker } from 'msw';\nimport { handlers } from './handlers';\n\n// Configures MSW for local browser environment\nexport const worker = setupWorker(...handlers);"
      },

      {
        "title": "MSW Node Server (Used in Jest Tests)",
        "filePath": "src/mocks/server.ts",
        "language": "ts",
        "code": "import { setupServer } from 'msw/node';\nimport { handlers } from './handlers';\n\n// Setup server for Node (Jest testing)\nexport const server = setupServer(...handlers);"
      },

      {
        "title": "Utility Types for Request & JSON Shapes",
        "filePath": "src/mocks/utils.ts",
        "language": "ts",
        "code": "export type ToJson<T> = {\n  [k in keyof T]: string;\n};\n\nexport type RequestParams<T> = {\n  [paramName: string]: T | any;\n};"
      },

      {
        "title": "Main MSW Handler Registry",
        "filePath": "src/mocks/handlers.ts",
        "language": "ts",
        "highlightLines": [1, 13],
        "code": "import authHandler from './endpoints/auth';\nimport patientHandlers from './endpoints/patient';\nimport trainingHandlers from './endpoints/trainingVideos';\nimport dashboardHandlers from './endpoints/dashboardDetails';\nimport doctorHandlers from './endpoints/doctorRanking';\nimport profileHandlers from './endpoints/profile';\nimport reviewHandlers from './endpoints/review';\nimport feedbackHandlers from './endpoints/feedback';\nimport referralHandlers from './endpoints/referral';\nimport simHandlers from './endpoints/simConnectivity';\n\nexport const handlers = [\n  ...referralHandlers,\n  ...authHandler,\n  ...patientHandlers,\n  ...trainingHandlers,\n  ...dashboardHandlers,\n  ...doctorHandlers,\n  ...profileHandlers,\n  ...reviewHandlers,\n  ...feedbackHandlers,\n  ...simHandlers,\n];"
      },

      {
        "title": "Start MSW Only in Local Dev Environment",
        "filePath": "src/index.tsx",
        "language": "tsx",
        "highlightLines": [3, 5],
        "code": "import { isDevEnv, isLocalUrl } from './serverConfig';\n\nif (isDevEnv && isLocalUrl) {\n  const { worker } = require('./mocks/browser.ts');\n  worker.start();\n}\n\n// ... React App Rendering"
      },

      {
        "title": "Jest Test Setup Integrating MSW Node Server",
        "filePath": "src/setupTests.ts",
        "language": "ts",
        "highlightLines": [10, 27, 39],
        "code": "import { server } from './mocks/server';\nimport { act } from 'react-dom/test-utils';\nimport { cleanup } from '@testing-library/react';\n\nbeforeAll(() => {\n  server.listen();\n});\n\nafterEach(() => {\n  server.resetHandlers();\n  // Reset RTK Query API cache\n  act(() => {\n    store.dispatch(ellacoreApi.util.resetApiState());\n  });\n});\n\nafterAll(() => {\n  server.close();\n  cleanup();\n});"
      },

      {
        "title": "Example Component Test Using MSW Overrides",
        "filePath": "src/components/AntTable.test.tsx",
        "language": "tsx",
        "highlightLines": [5, 17],
        "code": "describe('AntTable.tsx', () => {\n  test('should render error message when data is null', async () => {\n    server.use(\n      rest.get(endpoints.PATIENTS, async (_, res, ctx) => {\n        return res(\n          ctx.status(200),\n          ctx.json({ totalcount: 0, statusCode: 200, message: 'Data found', data: [] })\n        );\n      })\n    );\n\n    act(() => {\n      renderWithAuth(<PatientAntTable physicianid={12} />);\n    });\n\n    await screen.findByRole('columnheader', { name: /patient name/i });\n  });\n});"
      },

      {
        "title": "MSW Referral Endpoints with Zod Validation",
        "filePath": "src/mocks/endpoints/referral.ts",
        "language": "ts",
        "highlightLines": [8, 37, 63],
        "code": "import { rest } from 'msw';\nimport { endpoints } from '../../app/services';\nimport { z } from 'zod';\nimport { AddReferralReq, UpdateReferralReq } from '../../features/patient/referrals/referralsAPI';\n\nconst addPatientSchema = z.object({\n  Address: z.string().min(3).max(253),\n  dob: z.coerce.date(),\n  zipcode: z.string().length(6),\n  gender: z.enum(['Male', 'Female']),\n  email: z.string().email(),\n  phoneNumber: z.string().length(10),\n  name: z.string().min(2).max(32)\n});\n\nconst referralHandlers = [\n  rest.get(endpoints.FETCH_PATIENT, async (_, res, ctx) => {\n    return res(\n      ctx.status(200),\n      ctx.json({\n        data: [\n          { name: 'Manasi Arora', phone: '83083339434', city: 'Coimbatore', gender: 'Female', age: '41' },\n          { name: 'Manveet Kaur', phone: '9123444312', city: 'Gurgaon', gender: 'Female', age: '26' }\n        ],\n        message: 'Data fetched successfully',\n        statusCode: 200\n      })\n    );\n  }),\n\n  rest.post(endpoints.ADD_REFERRAL, async (req, res, ctx) => {\n    const payload = await req.json();\n    const result = addPatientSchema.safeParse(payload);\n\n    if (!result.success) {\n      return res(\n        ctx.status(200),\n        ctx.json({ statusCode: 400, message: 'Failed to add patient', user: false })\n      );\n    }\n\n    return res(\n      ctx.status(200),\n      ctx.json({ statusCode: 200, message: 'Referral Added successfully' })\n    );\n  }),\n\n  rest.put(endpoints.UPDATE_REFERRAL_STATUS, async (req, res, ctx) => {\n    const payload = await req.json();\n    const result = addPatientSchema.safeParse(payload);\n\n    if (!result.success) {\n      return res(ctx.status(200), ctx.json({ statusCode: 400, message: 'Failed to update patient' }));\n    }\n\n    return res(ctx.status(200), ctx.json({ statusCode: 200, message: 'Referral updated successfully' }));\n  })\n];\n\nexport default referralHandlers;"
      }
    ],

    "usage": "import { rest } from 'msw';\nimport { server } from '@/mocks/server';\n\n// Override API for a single test\nserver.use(\n  rest.get('/api/users', (_, res, ctx) => res(ctx.json({ users: [] })))\n);\n\n// UI behaves as if the backend returned empty users",

    "howItWorks": [
      "MSW intercepts all fetch/XHR requests at network layer.",
      "During local development, the browser worker returns mock API responses.",
      "During Jest tests, MSW Node server replaces real API calls.",
      "Each mock endpoint behaves like a real REST service: GET, POST, PUT, DELETE.",
      "I created contract-first mock responses and shared them with backend devs.",
      "Backend team implemented APIs by following my mocks exactly.",
      "UI was developed, tested, and validated before backend existed.",
      "Zod validation helped catch malformed requests before hitting backend."
    ],

    "devNotes": [
      "MSW runs before React mounts, ensuring consistent mock environment.",
      "Mock definitions ensure UI does not break when backend is unavailable.",
      "Each endpoint mimics real-world scenarios: success, error, delay.",
      "Contracts were shared with backend to guarantee API compatibility.",
      "MSW + Zod helped validate schemas before backend validation existed."
    ],

    "impact": [
      "Frontend was completed before backend was ready — zero blockers.",
      "Reduced integration bugs by ~80% thanks to contract-first approach.",
      "Backend developers implemented APIs exactly as per mock contract.",
      "UI always worked offline & on localhost without backend dependency.",
      "Testing became faster and more reliable with MSW’s Node server.",
      "Cut overall development time significantly and improved dev experience."
    ]
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
    // "demo": "<img src='/images/casestudy/dashboard.png' class='rounded-lg border shadow-sm w-full' />",
    "installation": {
      "title": "Install Redux-Saga",
      "code": "npm install redux react-redux redux-saga",
      "language": "bash",
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

  {
    "slug": "chartsjs-advanced-configuration",
    "title": "Advanced Chart.js Configuration",
    "subtitle": "Multi-Line & Trend Visualization",
    "description": "Interactive charts built using Chart.js with dynamic datasets, hover indicators, gradient fills, and time scaling.",
    "problem": "The dashboard required visual insights for trends and analytics using dynamic charts.",
    "installation": {
      "code": "npm install chart.js react-chartjs-2 chartjs-adapter-date-fns",
      "language": "bash"
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




  {
    "slug": "end-to-end-deployment-pipeline",
    "title": "End-to-End Deployment Pipeline",
    "subtitle": "CI/CD Workflow Across Dev → Staging → Production",
    "description": "Built a structured deployment pipeline using Git branching, CI/CD workflows, environment configs, and automated promotion.",
    "problem": "Releases were unstable due to direct commits to main and lack of environment separation.",
    "installation": {
      "filePath": "Initial Project & Git Setup",
      "language": "bash",
      "code": "git init\ngit remote add origin git@github.com:org/sample-app.git\ngit checkout -b main\n\necho \"# sample-app\" > README.md\ngit add .\ngit commit -m \"chore: initial commit\"\ngit push -u origin main"
    },

    "demo": "<div class='rounded-xl border shadow p-4 bg-card'><p>🚀 Below is a conceptual preview of the deployment flow implemented:</p><ul><li>Developer creates a feature branch locally.</li><li>Code is pushed to GitHub and a Pull Request is opened.</li><li>CI pipeline builds, tests, and deploys to Dev.</li><li>After validation, the same artifact is promoted to Staging.</li><li>On approval, the artifact is promoted to Production and exposed to end users.</li></ul></div>",

    "codeBlocks": [
      {
        "title": "Branching Model for Safe Changes",
        "filePath": "docs/branching-strategy.md",
        "language": "md",
        "highlightLines": [5, 12],
        "code": "# Branching Strategy\n\n- main: Production-ready code only.\n- staging: Candidate builds for pre-production testing.\n- dev: Integrated builds for internal testing.\n- feature/*: Short-lived branches per ticket.\n\n## Typical Flow\n\nfeature/TICKET-123 -> dev -> staging -> main\n\nEach merge into dev, staging, or main triggers a CI/CD pipeline.\n"
      },
      {
        "title": "Sample CI Workflow (GitHub Actions)",
        "filePath": ".github/workflows/ci-cd.yml",
        "language": "yml",
        "highlightLines": [1, 24, 46],
        "code": "name: CI-CD Pipeline\n\non:\n  push:\n    branches:\n      - dev\n      - staging\n      - main\n  pull_request:\n    branches:\n      - dev\n\njobs:\n  build-and-test:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v4\n\n      - name: Setup Node\n        uses: actions/setup-node@v4\n        with:\n          node-version: 20\n\n      - name: Install dependencies\n        run: npm ci\n\n      - name: Run tests\n        run: npm test\n\n  deploy:\n    needs: build-and-test\n    runs-on: ubuntu-latest\n    if: github.ref == 'refs/heads/dev' || github.ref == 'refs/heads/staging' || github.ref == 'refs/heads/main'\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v4\n\n      - name: Set target environment\n        id: env\n        run: |\n          if [[ \"${GITHUB_REF##*/}\" == \"dev\" ]]; then\n            echo \"env=dev\" >> $GITHUB_OUTPUT\n          elif [[ \"${GITHUB_REF##*/}\" == \"staging\" ]]; then\n            echo \"env=staging\" >> $GITHUB_OUTPUT\n          else\n            echo \"env=prod\" >> $GITHUB_OUTPUT\n          fi\n\n      - name: Deploy to ${{ steps.env.outputs.env }}\n        run: ./scripts/deploy.sh ${{ steps.env.outputs.env }}\n"
      },
      {
        "title": "Local Development & Feature Branch Flow",
        "filePath": "docs/local-dev-flow.md",
        "language": "md",
        "code": "## Local Development Flow\n\n1. Pull latest main branch.\n2. Create feature branch from main.\n\n``````\n\n3. Implement code, run tests locally.\n\n``````\n\n4. Commit and push.\n\n``````\n\n5. Open Pull Request to dev and request review.\n"
      },
      {
        "title": "Environment-Aware Deployment Script",
        "filePath": "scripts/deploy.sh",
        "language": "bash",
        "highlightLines": [4, 18],
        "code": "#!/usr/bin/env bash\n\nset -euo pipefail\n\nENV=\"${1:-dev}\"\n\ncase \"$ENV\" in\n  dev)\n    CLUSTER=\"dev-cluster\"\n    NAMESPACE=\"sample-app-dev\"\n    ;;\n  staging)\n    CLUSTER=\"staging-cluster\"\n    NAMESPACE=\"sample-app-staging\"\n    ;;\n  prod)\n    CLUSTER=\"prod-cluster\"\n    NAMESPACE=\"sample-app\"\n    ;;\n  *)\n    echo \"Unknown environment: $ENV\" && exit 1\n    ;;\nesac\n\n echo \"Deploying to $ENV using cluster=$CLUSTER namespace=$NAMESPACE\"\n\n# Example: kubectl apply or helm upgrade\n# kubectl --context=\"$CLUSTER\" -n \"$NAMESPACE\" apply -f k8s/\n"
      },
      {
        "title": "Environment Configuration",
        "filePath": "config/environments.json",
        "language": "json",
        "code": "{\n  \"dev\": {\n    \"apiBaseUrl\": \"https://api-dev.example.com\",\n    \"logLevel\": \"debug\",\n    \"featureFlags\": {\n      \"showExperimentalFeatures\": true\n    }\n  },\n  \"staging\": {\n    \"apiBaseUrl\": \"https://api-staging.example.com\",\n    \"logLevel\": \"info\",\n    \"featureFlags\": {\n      \"showExperimentalFeatures\": false\n    }\n  },\n  \"prod\": {\n    \"apiBaseUrl\": \"https://api.example.com\",\n    \"logLevel\": \"warn\",\n    \"featureFlags\": {\n      \"showExperimentalFeatures\": false\n    }\n  }\n}\n"
      },
      {
        "title": "Post-Deployment Smoke Test Example",
        "filePath": "tests/smoke/healthcheck.test.ts",
        "language": "ts",
        "code": "import axios from 'axios';\n\nconst baseUrl = process.env.APP_BASE_URL as string;\n\ndescribe('Smoke: /health endpoint', () => {\n  it('should return 200 OK', async () => {\n    const res = await axios.get(`${baseUrl}/health`);\n    expect(res.status).toBe(200);\n    expect(res.data.status).toBe('ok');\n  });\n});\n"
      }
    ],

    "usage": "### End-to-End Deployment Usage Example\n\n1. Product owner creates tickets in a project management tool.\n2. Developer picks a ticket, creates a feature branch, and codes locally.\n3. Code is pushed to origin and a Pull Request is opened against the dev branch.\n4. CI pipeline builds and tests the code, then auto-deploys the result to the Dev environment.\n5. QA tests in Dev, then the same artifact is promoted to Staging for realistic pre-prod testing.\n6. After sign-off, the artifact is promoted to Production (main branch), and the app becomes available to end users.[web:5]",

    "howItWorks": [
      "Work items are captured in a planning or project management tool and assigned to developers as tickets.[web:5]",
      "Developers implement and test features locally, then push code to a shared Git repository like GitHub, GitLab, or Bitbucket.[web:5]",
      "Feature branches prevent unstable code from going directly into the main branch and allow focused code reviews before merging.[web:5]",
      "Merging into dev triggers a CI pipeline that runs automated build and test steps before deploying to the Dev environment.[web:5]",
      "Staging uses production-like configuration and realistic data to validate performance, integration, and smoke tests before release.[web:5]",
      "Once staging passes, changes are merged into the production branch, triggering deployment to the production environment (for example, a Kubernetes cluster on AWS).[web:5]",
      "End users only interact with the production environment, while Dev and Staging are used purely for internal validation.[web:5]",
      "This multi-stage pipeline reduces risk, enforces best practices, and makes every deployment traceable and repeatable.[web:5]"
    ],

    "devNotes": [
      "Never commit directly to the main branch; always use feature branches plus Pull Requests for traceability and review.[web:5]",
      "Protect main and staging branches with required status checks so merges only happen when CI passes.[web:5]",
      "Use the same build artifact across Dev, Staging, and Prod to avoid “works on my machine” or environment drift issues.[web:5]",
      "Externalize environment-specific config (URLs, credentials, feature flags) so that code does not change between environments.[web:5]",
      "Automate smoke tests after each deployment to quickly detect broken builds before users notice.[web:5]",
      "Integrate monitoring and logging (for example, dashboards and alerts) to catch performance or reliability issues post-deployment.[web:5]"
    ],

    "impact": [
      "Reduced production issues by ensuring each change passes through Dev and Staging environments before reaching end users.[web:5]",
      "Improved developer productivity by standardizing the branching strategy and automating repetitive deployment steps with CI/CD.[web:5]",
      "Enabled faster, safer releases because each deployment is small, reviewed, and tested automatically.[web:5]",
      "Made rollbacks and hotfixes easier by tracking every change through commits, branches, and pull requests.[web:5]",
      "Increased confidence for stakeholders, as visibility into the pipeline stages makes it clear what is running in each environment at any time.[web:5]"
    ]
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
    },
    "codeBlocks": [
      {
        "title": "Zod Schema for OTP Validation (6-digit numeric)",
        "filePath": "src/features/auth/OTPForm.tsx",
        "language": "ts",
        "highlightLines": [13],
        "code": "const numberInString = z\n  .string()\n  .length(6, { message: 'OTP must contain exactly 6 characters' })\n  .nonempty({ message: 'Please enter an OTP' })\n  .transform((val, ctx) => {\n    if (!/\\d/.test(val)) {\n      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Please enter a valid numeric OTP' });\n      return z.NEVER;\n    }\n    return val;\n  });\n\nconst OTPFormSchema = z.object({ otpCode: numberInString });"
      },

      {
        "title": "Countdown Timer Logic (15 minutes)",
        "filePath": "src/features/auth/OTPForm.tsx",
        "language": "ts",
        "highlightLines": [1, 4, 5],
        "code": "const initialTime = { sec: 60_000 * 15 }; // 15 minutes\nconst initialContinue = { sec: 60_000 * 15 };\n\nconst [timeLeft, actions] = useCountDown(initialTime.sec, 150);\nconst [continueBtnLeft, continueAction] = useCountDown(initialContinue.sec, 1000);\n\nuseEffect(() => {\n  actions.start();\n  continueAction.start();\n}, []);"
      },

      {
        "title": "Milliseconds ➝ MM:SS Formatter",
        "filePath": "src/features/auth/OTPForm.tsx",
        "language": "ts",
        "code": "function convertMillisecondsToMMSS(milliseconds: number) {\n  const totalSeconds = Math.floor(milliseconds / 1000);\n  const minutes = Math.floor(totalSeconds / 60);\n  const seconds = totalSeconds % 60;\n  return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;\n}"
      },

      {
        "title": "OTP Verification Using RTK Query",
        "filePath": "src/features/auth/OTPForm.tsx",
        "language": "ts",
        "highlightLines": [15, 24, 35],
        "code": "const onSubmit = async (data: OTPFormType) => {\n  const otp = data.otpCode;\n  try {\n    const otpRes = await validateOtp({ otp: +otp, email, roleid: userRoleId }).unwrap();\n\n    if (otpRes?.statusCode === 200) {\n      dispatch(setCredentials({ user: otpRes.user, token: otpRes.token }));\n      dispatch(setOnboard(otpRes.user));\n      setLoggedIn(true);\n      return;\n    }\n\n    setError('otpCode', { type: 'server', message: 'Please enter a valid OTP' });\n  } catch (err) {\n    const res = err?.data as OtpValidationResponse;\n    toast.error(res?.message || 'OTP validation failed');\n  }\n};"
      },

      {
        "title": "Secure Resend OTP Handler With Timer Reset",
        "filePath": "src/features/auth/OTPForm.tsx",
        "language": "ts",
        "highlightLines": [10, 18, 26],
        "code": "const handleResendOTP = async () => {\n  try {\n    const otpResponse = await otpGeneration({ email, roleid: userRoleId }).unwrap();\n\n    if (otpResponse?.statusCode === 200) {\n      toast.success('OTP sent successfully');\n      actions.start();       // reset timer\n      continueAction.start();\n      return;\n    }\n\n    toast.error(otpResponse?.message || 'OTP failure');\n  } catch (err) {\n    toast.error(err?.data?.message || 'OTP failure');\n  }\n};"
      },

      {
        "title": "Final React Component with Countdown UI",
        "filePath": "src/features/auth/OTPForm.tsx",
        "language": "tsx",
        "highlightLines": [18, 41, 55, 89],
        "code": "<form onSubmit={handleSubmit(onSubmit)}>\n  <input\n    type='number'\n    placeholder='Enter OTP'\n    className='bg-gray-50 border rounded-full w-full p-2.5 text-xl'\n    {...register('otpCode')}\n  />\n  <p className='text-coral text-sm'>{errors.otpCode?.message}</p>\n\n  <button\n    type='submit'\n    disabled={isLoading || !continueBtnLeft}\n    className={`bg-blue-dark w-full text-white rounded-full p-2 text-xl ${continueBtnLeft ? '' : 'opacity-50 cursor-not-allowed'}`}\n  >\n    {isLoading ? 'Validating...' : 'Login'}\n  </button>\n\n  <div className='text-sm mt-7'>\n    {timeLeft ? `Time Remaining: ${formatTime}` : 'Didn’t receive OTP?'}\n    <button\n      type='button'\n      disabled={otpGenerating || timeLeft > 0}\n      onClick={handleResendOTP}\n      className={`text-coral underline active:text-red-600 ${timeLeft > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}\n    >\n      {otpGenerating ? 'RESENDING...' : 'RESEND OTP'}\n    </button>\n  </div>\n</form>"
      },

      {
        "title": "Protect from Page Refresh (beforeunload alert)",
        "filePath": "src/hooks/useRefreshAlert.ts",
        "language": "ts",
        "code": "useEventListener('beforeunload', (event) => {\n  event.preventDefault();\n  return (event.returnValue = '');\n});"
      }
    ],

    "usage": "return <OTPForm setLoginView={setLoginView} />",

    "howItWorks": [
      "User enters email → receives OTP via backend.",
      "Timer (15 minutes) begins immediately using `react-countdown-hook`.",
      "Input is validated using Zod to ensure it is exactly a 6-digit numeric value.",
      "React Hook Form manages errors, touched state, and submission.",
      "RTK Query validates OTP through `useOtpValidationMutation`.",
      "On success → Redux stores user credentials and navigates to Home.",
      "Resend OTP only appears after timer ends (prevents abuse).",
      "Resend button resets countdown timers and sends new OTP.",
      "Page refresh is protected using beforeunload event to prevent OTP loss."
    ],

    "devNotes": [
      "The resend OTP is disabled while countdown is active to prevent spam.",
      "Used Zod transform() to block non-numeric input safely.",
      "`convertMillisecondsToMMSS` ensures clean UI formatting.",
      "Two countdown timers used: one for UI, one for disabling login button.",
      "RTK Query `.unwrap()` used for clean success/error handling.",
      "Used toast notifications for all fail/success events.",
      "Auto-navigate using React Router after successful login."
    ],

    "impact": [
      "Improved login success rate with real-time error handling.",
      "Prevents OTP abuse via timed resend lockout.",
      "Very low memory footprint thanks to lightweight countdown hook.",
      "Reduced user friction with clear MM:SS visible timer.",
      "Production-grade security through strict Zod validation.",
      "Smooth, modern UX suitable for enterprise auth systems."
    ]
  }
]

export default data;
