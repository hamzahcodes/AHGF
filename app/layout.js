// import { AuthProvider } from './Providers'
import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './providers'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CRM',
  description: 'One stop solution to CRM',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="business">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
