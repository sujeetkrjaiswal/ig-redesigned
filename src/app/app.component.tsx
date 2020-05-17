import React, { FC, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import Routes from 'src/routes/routes.index'
import ActivityIndicator from 'src/components/activity-indicator/activity-indicator.component'
import BottomNav from 'src/components/bottom-nav/bottom-nav.component'
import { AuthProvider } from 'src/contexts/Auth.context'

import styles from './app.module.scss'

const App: FC<{}> = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HelmetProvider>
          <div className={styles.outerContainer}>
            <Helmet>
              <title>Instagram - Redesigned</title>
              <meta name="description" content="Instagram User Profile Redesigning" />
            </Helmet>
            <main className={styles.appContainer}>
              <div className={styles.appContent} id="app-content">
                <Suspense fallback={<ActivityIndicator />}>
                  <Routes />
                </Suspense>
              </div>
              <BottomNav />
            </main>
          </div>
        </HelmetProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
