import { FC } from 'react';

interface DataCardLayoutProps {}

const DataCardLayout: FC<DataCardLayoutProps> = ({ children }) => {
  return (
    <div className="scroll-container">
      <div className="d-flex flex-wrap gap-3 justify-content-between pe-2">
        {children}
      </div>
    </div>
  );
};

export default DataCardLayout;
