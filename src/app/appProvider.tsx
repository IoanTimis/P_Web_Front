//Aici trebuie facut import de componente nav footer
//exemplu:
// 'use client';

// import React from "react";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react"; // Importă PersistGate
// import Navbar from "./components/general/header";
// import StudentNavBar from "./components/student/header";
// import TeacherNavBar from "./components/teacher/header";
// import Footer from "./components/general/footer";
// import ErrorDiv from "./components/general/error-div";
// import { store,  persistor } from "@/store/page"; // Importă persistor
// import { usePathname } from "next/navigation";
// import { ErrorProvider } from "@/context/errorContext";

// export default function AppProvider({ children }) {
//   const pathname = usePathname();

//   const getNavbar = () => {
//     if (pathname.startsWith("/teacher")) {
//       return <TeacherNavBar />;
//     } else if (pathname.startsWith("/student")) {
//       return <StudentNavBar />;
//     } else {
//       return <Navbar />;
//     }
//   };

//   if (pathname.startsWith("/admin")) {
//     return <>{children}</>;
//   }

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <ErrorProvider>
//           {getNavbar()} 
//           <ErrorDiv /> 
//           <main className="flex-grow bg-gray-200">
//             <div className="lg:mx-24 xl:mx-32 2xl:mx-64">
//               {children}
//             </div>
//           </main>
//           <Footer />
//         </ErrorProvider>
//       </PersistGate>
//     </Provider>
//   );
// } iar in layout.tsx trb sa invelim aplicatia cu appProvider :

// Exemplu layout invelit cu appProvider
// import localFont from "next/font/local";
// import "./globals.css";
// import AppProvider from "./appProvider";
// import { LanguageProvider } from "@/context/Languagecontext";

// // Fonturile localizate
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata = {
//   title: "Online BSc/MSc Themes Selection Application",
//   description: "Gestionarea online a temelor de licență și disertație",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
//         <LanguageProvider>
//           <AppProvider>
//             {children}
//           </AppProvider>
//         </LanguageProvider>
//       </body>
//     </html>
//   );
// }

