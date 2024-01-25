import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rangeParser from 'parse-numeric-range';
type MarkdownProps = {
	content: string;
};
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);

const Highlight: FC<MarkdownProps> = ({ content }) => {
	const syntaxTheme = oneDark;
	const MarkdownComponents = {
		code(props: any) {
			const { children, className, node, ...rest } = props;
			const hasLang = /language-(\w+)/.exec(className || '');
			const hasMeta = node?.data?.meta;

			const applyHighlights: object = (applyHighlights: number) => {
				if (hasMeta) {
					const highlightLines = rangeParser('0');
					const highlight = highlightLines;
					const data: string | null = highlight.includes(applyHighlights)
						? 'highlight'
						: null;
					return { data };
				} else {
					return {};
				}
			};

			return hasLang ? (
				<SyntaxHighlighter
					style={syntaxTheme}
					language={hasLang[1]}
					PreTag="div"
					className="codeStyle"
					showLineNumbers={true}
					wrapLines={hasMeta}
					useInlineStyles={true}
					lineProps={applyHighlights}
				>
					{props.children}
				</SyntaxHighlighter>
			) : (
				<code className={className} {...props} />
			);
		},
	};
	return (
		<ReactMarkdown components={MarkdownComponents}>{content}</ReactMarkdown>
	);
};

export default Highlight;
