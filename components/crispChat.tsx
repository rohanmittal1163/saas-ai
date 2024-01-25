'use client';
import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

export const CrispChat = () => {
	useEffect(() => {
		Crisp.configure('cc72ca14-38f3-4827-a118-3fcaa27fb7ea');
	}, []);
	return null;
};
