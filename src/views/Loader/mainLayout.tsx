import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/RootReducer';
import Loading from '../../loader/loader';
import Navbar from '../../components/Navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const loading = useSelector((state: RootState) => state.loaderState.loading);

  return (
    <>
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
          }}
        >
          <Loading />
        </div>
      )}

      <Navbar />
      {children}
    </>
  );
};

export default MainLayout;
