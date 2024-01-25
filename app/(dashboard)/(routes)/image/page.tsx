'use client';
import { useState } from 'react';
import Image from 'next/image';

import { ImageIcon } from 'lucide-react';
import * as z from 'zod';
import axios from 'axios';

import Heading from '@/components/heading';
import Empty from '@/components/empty';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveAs } from 'file-saver';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { AmountOption } from '@/interfaces';
import Loader from '@/components/loader';
import { ResolutionOption, amountOption } from '@/constants';
import { useRouter } from 'next/navigation';
import { useProModal } from '@/hooks/useProModal';

const formSchema = z.object({
	prompt: z.string().min(1, {
		message: 'prompt is required',
	}),
	amount: z.string(),
	resolution: z.string(),
});

export default function ImagePage() {
	const router = useRouter();
	const proModal = useProModal();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
			amount: '1',
			resolution: '512x512',
		},
	});
	const [imageURL, setImageURL] = useState<string[]>([]);
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setLoading(true);
		try {
			const res = await axios.post('/api/image', {
				prompt: values.prompt,
				amount: values.amount,
				resolution: values.resolution,
			});
			setImageURL(res.data);
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

	const [isLoading, setLoading] = useState<boolean>(false);

	return (
		<div className="py-2 px-5 flex flex-col gap-8 h-[calc(100%-65px)]">
			<Heading
				backgroundColor="bg-pink-700/10"
				color="text-pink-700"
				desc="Our most advanced conversation model."
				label="Image Generation"
				icon={ImageIcon}
			/>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col md:flex-row border-2 rounded-md p-2 w-full"
				>
					<FormField
						control={form.control}
						disabled={isLoading}
						name="prompt"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="A picture for horse in swiss alps"
										{...field}
										className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<div className="grid grid-rows-2 grid-cols-2 w-full gap-3 md:grid-rows-1 md:grid-cols-3">
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem className="w-full">
									<Select
										defaultValue={field.value}
										onValueChange={field.onChange}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue defaultValue={field.value} />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{amountOption.map((val: AmountOption, idx: number) => {
												return (
													<SelectItem key={idx} value={val.value}>
														{val.label}
													</SelectItem>
												);
											})}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="resolution"
							render={({ field }) => (
								<FormItem className="w-full">
									<Select
										defaultValue={field.value}
										onValueChange={field.onChange}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue defaultValue={field.value} />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{ResolutionOption.map((val: string, idx: number) => {
												return (
													<SelectItem key={idx} value={val}>
														{val}
													</SelectItem>
												);
											})}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>

						<Button
							variant="primary"
							type="submit"
							className="w-full col-span-2 md:col-span-1"
							disabled={isLoading}
						>
							Generate
						</Button>
					</div>
				</form>
			</Form>

			<div className="flex flex-col gap-4 h-full overflow-y-scroll overflow-x-hidden p-1.5 relative">
				{isLoading && <Loader />}
				{imageURL.length === 0 && !isLoading && (
					<Empty desc="No images Generated." />
				)}
				<div className="flex gap-5 flex-wrap">
					{imageURL.map((url: string, idx: number) => {
						return (
							<>
								<div
									key={idx}
									className="flex flex-col items-start gap-2 shadow-lg p-3 rounded-md "
								>
									<Image
										alt="ai image"
										src={url}
										width={250}
										height={250}
										quality={100}
									></Image>
									<Button
										variant="outline"
										className="w-full"
										onClick={() => {
											saveAs(url, 'ai_Image.png');
										}}
									>
										Download
									</Button>
								</div>
							</>
						);
					})}
				</div>
			</div>
		</div>
	);
}
