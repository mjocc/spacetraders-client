import prettyjson from 'prettyjson';
import { FC } from 'react';
import { Alert } from 'react-bootstrap';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import yaml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import { HistoryItem } from '../store/slices/commandHistory';
import LoadingScreen from './LoadingScreen';

SyntaxHighlighter.registerLanguage('yaml', yaml);

interface DisplayCommandResultsProps {
  loading: boolean;
  id: string | undefined;
  historyItem: HistoryItem | undefined;
}

const DisplayCommandResults: FC<DisplayCommandResultsProps> = ({
  loading,
  id,
  historyItem,
}) => {
  if (id && historyItem)
    return (
      <SyntaxHighlighter
        className="scroll-container"
        language="yaml"
        style={atomDark}
      >
        {prettyjson.render(historyItem.results)}
      </SyntaxHighlighter>
    );

  if (loading) return <LoadingScreen />;

  if (!id)
    return (
      <Alert variant="warning">
        No &lsquo;id&rsquo; query parameter provided.
      </Alert>
    );

  return (
    <Alert variant="danger">
      Invalid &lsquo;id&rsquo; query parameter. The history item may have been
      deleted.
    </Alert>
  );
};

export default DisplayCommandResults;
