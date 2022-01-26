import Isotope from 'isotope-layout';
import { FC, useEffect, useState } from 'react';

interface DataCardLayoutProps {}

const DataCardLayout: FC<DataCardLayoutProps> = ({ children }) => {
  const [isotope, setIsotope] = useState<Isotope | null>(null);
  const [filterKey, setFilterKey] = useState('*');

  useEffect(() => {
    if (window) {
      setIsotope(
        new Isotope('.isotope-container', {
          itemSelector: '.filter-item',
          // layoutMode: 'masonry',
          layoutMode: 'fitRows',
        })
        );
      }
  }, []);

  // useEffect(() => {
  //   if (isotope) {
  //     isotope.arrange({ filter: filterKey });
  //   }
  // }, [isotope, filterKey]);

  return (
    <div className="scroll-container">
      {/* <div className="isotope-container">{children}</div> */}
      <div className="isotope-container">
        <div className="filter-item">1</div>
        <div className="filter-item">2</div>
        <div className="filter-item">3</div>
        <div className="filter-item">4</div>
        <div className="filter-item">5</div>
        <div className="filter-item">6</div>
        <div className="filter-item">7</div>
      </div>
    </div>
  );
};

export default DataCardLayout;
