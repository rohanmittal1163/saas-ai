'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';

import { Code } from 'lucide-react';
import * as z from 'zod';
import axios from 'axios';

import Heading from '@/components/heading';
import Empty from '@/components/empty';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { ChatMessage } from '@/interfaces';
import Loader from '@/components/loader';

import Markdown from 'react-markdown';
import { useRouter } from 'next/navigation';
import { useProModal } from '@/hooks/useProModal';

const formSchema = z.object({
	prompt: z.string().min(1, {
		message: 'prompt is required',
	}),
});

export default function ConversationPage() {
	const router = useRouter();
	const proModal = useProModal();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setLoading(true);
		try {
			const userMessage: ChatMessage = {
				role: 'user',
				content: values.prompt,
			};

			const newMessage = [...message, userMessage];

			const res = await axios.post('/api/code', {
				messages: newMessage,
			});

			setMessage((curr) => [userMessage, res.data, ...curr]);
			form.reset();
		} catch (err: any) {
			if (err?.response?.status == 402) {
				proModal.onOpen();
			}
			console.log('err', err);
		} finally {
			setLoading(false);
			router.refresh();
		}
	};

	const [message, setMessage] = useState<ChatMessage[]>([]);
	const { user } = useUser();
	const [isLoading, setLoading] = useState<boolean>(false);

	return (
		<div className="py-2 px-5 flex flex-col gap-8 h-[calc(100%-65px)]">
			<Heading
				backgroundColor="bg-green-700/10"
				color="text-green-700"
				desc="Generate code using descriptive text."
				label="code generation"
				icon={Code}
			/>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col md:flex-row border-2 rounded-md p-2 w-full"
				>
					<FormField
						control={form.control}
						name="prompt"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="Simple toggle button using react hooks"
										{...field}
										className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button
						variant="primary"
						type="submit"
						className="w-full md:w-1/6"
						disabled={isLoading}
					>
						Generate
					</Button>
				</form>
			</Form>

			<div className="flex flex-col gap-4 h-full overflow-y-scroll overflow-x-hidden p-1.5 relative">
				{isLoading && <Loader />}
				{message.length === 0 && !isLoading && (
					<Empty desc="No code started." />
				)}
				{message.map((msg: ChatMessage, idx: number) => {
					return (
						<>
							<div
								key={idx}
								className="flex items-start gap-10 bg-gray-400/10 p-3 rounded-md "
							>
								{msg.role === 'user' ? (
									<Avatar>
										<AvatarImage src={user?.imageUrl} />
										<AvatarFallback>
											{user?.firstName?.charAt(0)}
											{user?.lastName?.charAt(0)}
										</AvatarFallback>
									</Avatar>
								) : (
									<Image alt="botlogo" src="/logo.png" width={20} height={20} />
								)}
								<div>
									<Markdown
										components={{
											code(props) {
												const { children, className, node, ...rest } = props;
												const match = /language-(\w+)/.exec(className || '');
												return match ? (
													<SyntaxHighlighter
														{...rest}
														PreTag="div"
														language={match[1]}
														style={dark}
													>
														{String(children).replace(/\n$/, '')}
													</SyntaxHighlighter>
												) : (
													<code {...rest} className={className}>
														{children}
													</code>
												);
											},
										}}
									>
										{msg.content}
									</Markdown>
								</div>
							</div>
						</>
					);
				})}
			</div>
		</div>
	);
}
