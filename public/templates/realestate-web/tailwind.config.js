/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./**/*.{html,js}", "!./node_modules/**/*"],
   theme: {
      container: {
         center: true,
         screens: {
            "2xl": "1290px",
         },
      },
      extend: {
         colors: {
            primary: {
               DEFAULT: "var(--primary-500)",
               10: "var(--primary-10)",
               50: "var(--primary-50)",
               100: "var(--primary-100)",
               400: "var(--primary-400)",
               600: "var(--primary-600)",
            },
            secondary: {
               DEFAULT: "var(--secondary-500)",
               400: "var(--secondary-400)",
               300: "var(--secondary-300)",
            },
            new: {
               900: "var(--new-900)",
               800: "var(--new-800)",
               200: "var(--new-200)",
               100: "var(--new-100)",
            },
            nature: {
               800: "var(--nature-800)",
               600: "var(--nature-600)",
               500: "var(--nature-500)",
               400: "var(--nature-400)",
               300: "var(--nature-300)",
               200: "var(--nature-200)",
               100: "var(--nature-100)",
               50: "var(--nature-50)",
            },
            line: {
               100: "var(--line-100)",
            },
         },
         fontFamily: {
            "dm-sans": "DM Sans",
            poppins: "Poppins",
         },
         boxShadow: {
            shadow: "var(--shadow-1)",
            shadow2: "var(--shadow-2)",
            shadow3: "var(--shadow-3)",
            shadow4: "var(--shadow-4)",
            shadow5: "var(--shadow-5)",
            shadow6: "var(--shadow-6)",
            shadow7: "var(--shadow-7)",
            shadow8: "var(--shadow-8)",
            shadow9: "var(--shadow-9)",
            shadow10: "var(--shadow-10)",
            shadow11: "var(--shadow-11)",
         },
         height: {
            "nav-2": "var(--nav-height-2)",
         },
      },
   },
   plugins: [
      require("@tailwindcss/forms"),
      require("flowbite/plugin"),
      require("@tailwindcss/typography"),
   ],
}
