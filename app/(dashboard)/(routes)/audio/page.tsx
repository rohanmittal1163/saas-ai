'use client';
import { useState } from 'react';
import { AudioLinesIcon, MusicIcon } from 'lucide-react';
import * as z from 'zod';
import axios from 'axios';

import Heading from '@/components/heading';
import Empty from '@/components/empty';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Loader from '@/components/loader';
import { useRouter } from 'next/navigation';
import { useProModal } from '@/hooks/useProModal';

const formSchema = z.object({
	prompt: z.string().min(1, {
		message: 'prompt is required',
	}),
});

export default function Video() {
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
			const res = await axios.post('/api/audio', {
				prompt: values.prompt,
			});
			console.log(res);
			setAudio(res.data);
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

	const [audio, setAudio] = useState<string>('');
	const [isLoading, setLoading] = useState<boolean>(false);

	return (
		<div className="py-2 px-5 flex flex-col gap-8 h-[calc(100%-65px)]">
			<Heading
				backgroundColor="bg-purple-700/10"
				color="text-purple-700"
				desc="Turn your prompt into audio."
				label="Audio Generation"
				icon={AudioLinesIcon}
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
										placeholder=" Hello, my name is Suno. And, uh — and I like pizza. [laughs] But I also have other interests such as playing tic tac toe."
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

			<div className="flex flex-col gap-4 h-full items-center p-1.5 relative">
				{isLoading && <Loader />}
				{audio === '' && !isLoading && <Empty desc="No audio generated." />}
				{audio && <audio src={audio} controls className="w-full"></audio>}
			</div>
		</div>
	);
}
