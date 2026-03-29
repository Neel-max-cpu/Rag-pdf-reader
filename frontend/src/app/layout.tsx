import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";


const font = Poppins({
  weight:['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets:["latin"]
})
export const metadata: Metadata = {
  title: "Ai PDF Reader",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${font.className} antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster
          toastOptions={{
            className:"",
            style:{
              fontSize:'13px'
            },
          }}
        />
      </body>
    </html>
  );
}
