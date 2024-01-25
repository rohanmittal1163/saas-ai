import {
	LayoutDashboard,
	MessageSquare,
	ImageIcon,
	VideoIcon,
	Music,
	Code,
	Settings,
	Subtitles,
	AudioLines,
} from 'lucide-react';
import { AmountOption, SidebarRoutes } from './interfaces';

export const routes: SidebarRoutes[] = [
	{
		label: 'Dashboard',
		icon: LayoutDashboard,
		href: '/dashboard',
		color: 'text-sky-500',
	},
	{
		label: 'Conversation',
		icon: MessageSquare,
		href: '/conversation',
		color: 'text-violet-700',
		backgroundColor: 'bg-violet-700/10',
	},
	{
		label: 'Image Generation',
		icon: ImageIcon,
		color: 'text-pink-700',
		href: '/image',
		backgroundColor: 'bg-pink-700/10',
	},
	{
		label: 'Video Generation',
		icon: VideoIcon,
		color: 'text-orange-700',
		href: '/video',
		backgroundColor: 'bg-orange-700/10',
	},
	{
		label: 'Music Generation',
		icon: Music,
		color: 'text-emerald-500',
		href: '/music',
		backgroundColor: 'bg-emerald-700/10',
	},
	{
		label: 'Code Generation',
		icon: Code,
		color: 'text-green-700',
		href: '/code',
		backgroundColor: 'bg-green-700/10',
	},
	{
		label: 'Audio Generation',
		icon: AudioLines,
		color: 'text-purple-400',
		href: '/audio',
		backgroundColor: 'bg-purple-400/10',
	},
	{
		label: 'Settings',
		icon: Settings,
		href: '/settings',
		color: 'text-white',
	},
];

export const amountOption: AmountOption[] = [
	{
		value: '1',
		label: '1 Photo',
	},
	{
		value: '2',
		label: '2 Photo',
	},
	{
		value: '3',
		label: '3 Photo',
	},
	{
		value: '4',
		label: '4 Photo',
	},
];

const size: string[] = [
	'64',
	'128',
	'192',
	'256',
	'320',
	'384',
	'448',
	'512',
	'576',
	'640',
	'704',
	'768',
	'832',
	'896',
	'960',
	'1024',
];

export let ResolutionOption: string[] = [];

export const saasAiReviews = [
	{
		user: 'John Doe',
		designation: 'Data Scientist',
		review:
			'The SAAS AI platform is a game-changer for our data analysis tasks. It has significantly improved our efficiency and accuracy in handling complex datasets.',
	},
	{
		user: 'Alice Smith',
		designation: 'Software Engineer',
		review:
			'As a developer, I appreciate the seamless integration options provided by the SAAS AI platform. It has made it easy for us to incorporate powerful AI capabilities into our applications.',
	},
	{
		user: 'Emma Johnson',
		designation: 'Business Analyst',
		review:
			'The SAAS AI platform has proven invaluable in extracting meaningful insights from large volumes of business data. It has become an indispensable tool in our decision-making process.',
	},
	{
		user: 'Michael Brown',
		designation: 'IT Manager',
		review:
			'Our team has benefited greatly from the scalability and reliability of the SAAS AI platform. It has simplified the deployment and management of AI models, making it a preferred choice for our projects.',
	},
];
export const FREE_COUNTS = 5;

export const DAY_IN_MS = 86_400_000;

let i = 0;
let j = 0;
let n = size.length;
while (i != n) {
	ResolutionOption.push(`${size[i]}x${size[j]}`);
	j++;
	if (j == n) {
		i++;
		j = 0;
	}
}
