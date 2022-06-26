import { sortBy, startCase } from 'lodash';
import { FC, useMemo, useState } from 'react';
import { Form, InputGroup, Stack } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import DataCard, { DataCardProps } from './DataCard';

interface DataCardLayoutProps {
  children: (Omit<DataCardProps, 'ignoreDataKeys'> & { key: any })[];
  pageTitle: string;
  defaultOrderKey: string;
  ignoreDataKeys?: string[];
}

const DataCardLayout: FC<DataCardLayoutProps> = ({
  children,
  pageTitle,
  defaultOrderKey,
  ignoreDataKeys = [],
}) => {
  const keys = useMemo(
    () =>
      Object.keys(
        // @ts-ignore
        Object.assign({}, ...children.map(({ data }) => data))
      ),
    [children]
  );
  const [order, setOrder] = useState(defaultOrderKey);
  const orderedCards = sortBy(children, [`data.${order}`]);

  return (
    <>
      <Stack direction="horizontal" className="mb-3">
        <h1 className="h5 mb-0">{pageTitle}</h1>
        <InputGroup className="ms-auto" style={{ width: '300px' }}>
          <InputGroup.Text>Sort by</InputGroup.Text>
          <Form.Select
            aria-label="Card order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            {keys.map((key) => (
              <option key={key} value={key}>
                {startCase(key)}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
      </Stack>
      <Masonry
        breakpointCols={{ default: 5, 1650: 4, 1300: 3, 1000: 2 }}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {orderedCards.map((card) => (
          <DataCard
            {...card}
            key={card.key}
            ignoreDataKeys={ignoreDataKeys}
            highlight={order}
          />
        ))}
      </Masonry>
    </>
  );
};

export default DataCardLayout;
