import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography, Link, Stack } from '@mui/material';
import { IElements } from 'state/element';
import InlinedElements from './inlined';
import { memo } from 'react';
import { IActions } from 'state/action';
import ElementRef from './elementRef';
import ActionRef from './actionRef';
import Code from 'components/Code';

interface Props {
  content: string;
  language?: string;
  elements: IElements;
  actions: IActions;
}

function prepareContent({ elements, actions, content, language }: Props) {
  const elementNames = Object.keys(elements);
  const elementRegexp = elementNames.length
    ? new RegExp(`(${elementNames.join('|')})`, 'g')
    : undefined;

  const actionContents = Object.values(actions).map((a) => a.trigger);
  const actionRegexp = actionContents.length
    ? new RegExp(`(${actionContents.join('|')})`, 'g')
    : undefined;

  let preparedContent = content.trim();
  const inlinedelements: IElements = {};

  if (elementRegexp) {
    preparedContent = preparedContent.replaceAll(elementRegexp, (match) => {
      if (elements[match].display === 'inline') {
        inlinedelements[match] = elements[match];
      }
      return `[${match}](${match.replaceAll(' ', '_')})`;
    });
  }

  if (actionRegexp) {
    preparedContent = preparedContent.replaceAll(actionRegexp, (match) => {
      // spaces break markdown links. The address in the link is not used anyway
      return `[${match}](${match.replaceAll(' ', '_')})`;
    });
  }

  if (language) {
    preparedContent = `\`\`\`${language}\n${preparedContent}\n\`\`\``;
  }

  return { preparedContent, inlinedelements };
}

export default memo(function MessageContent({
  content,
  elements,
  actions,
  language
}: Props) {
  const { preparedContent, inlinedelements } = prepareContent({
    content,
    language,
    elements,
    actions
  });

  if (!preparedContent) return null;

  return (
    <Stack width="100%">
      <Typography
        sx={{
          width: '100%',
          minHeight: '20px',
          fontSize: '1rem',
          lineHeight: '1.5rem',
          fontFamily: 'Inter'
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="markdown-body"
          components={{
            a({ children, ...props }) {
              const name = children[0] as string;
              const element = elements[name];
              const action = Object.values(actions).find(
                (a) => a.trigger === name
              );

              if (element) {
                return <ElementRef element={element} />;
              } else if (action) {
                return <ActionRef action={action} />;
              } else {
                return (
                  <Link {...props} target="_blank">
                    {children}
                  </Link>
                );
              }
            },
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, '')}
                  style={a11yDark}
                  wrapLongLines
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <Code
                  inline={inline}
                  className={className}
                  children={children}
                  {...props}
                />
              );
            }
          }}
        >
          {preparedContent}
        </ReactMarkdown>
      </Typography>
      <InlinedElements inlined={inlinedelements} />
    </Stack>
  );
});
