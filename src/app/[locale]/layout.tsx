import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";
import { ConfigProvider } from '@/app/contexts/ConfigContext';
import classNames from 'classnames';

import { Flex, Background } from '@/once-ui/components'
import { Background as NewBackground} from '@/once-ui/components/NewBackground/NewBackground'
import { Column as NewColumn} from '@/once-ui/components/NewBackground/Column'
import { Footer, Header, RouteGuard } from "@/components";
import { baseURL, effects, style, neweffects } from '@/app/resources'

import { Inter } from 'next/font/google'
import { Source_Code_Pro } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { renderContent } from "@/app/resources";
import { useConfig } from '@/app/contexts/ConfigContext';
import { Analytics } from "@vercel/analytics/react"
import sttyles from '@/app/[locale]/app.module.scss'; // Import the CSS file for styling
import '../../app/styles/globals.scss'; // Import global styles



export async function generateMetadata(
	{ params: { locale }}: { params: { locale: string }}
) {

	const t = await getTranslations();
	const { person, home } = renderContent(t);

	return {
		metadataBase: new URL(`https://${baseURL}/${locale}`),
		title: home.title,
		description: home.description,
		openGraph: {
			title: `${person.firstName}'s Portfolio`,
			description: 'Portfolio website showcasing my work.',
			url: baseURL,
			siteName: `${person.firstName}'s Portfolio`,
			locale: 'en_US',
			type: 'website',
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
	}
};

const primary = Inter({
	variable: '--font-primary',
	subsets: ['latin'],
	display: 'swap',
})

type FontConfig = {
    variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;
/*
*/

const code = Source_Code_Pro({
	variable: '--font-code',
	subsets: ['latin'],
	display: 'swap',
});

interface RootLayoutProps {
	children: React.ReactNode;
	params: {locale: string};
	searchParams: {mode: string};
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({locale}));
  }

export default async function RootLayout({
	children,
	params: {locale},
	searchParams = {mode: 'default'} // Add default empty object
} : RootLayoutProps) {
	setRequestLocale(locale);
	const messages = await getMessages();
	const mode = (searchParams?.mode) || 'default';
	console.log('mode', mode);

	return (
		<ConfigProvider>
			<NextIntlClientProvider messages={messages}>
				
				<Flex
					as="html" lang="en"
					background="page"
					data-neutral={style.neutral} 
					data-brand={style.brand}
					data-accent={style.accent}
					data-solid={style.solid} 
					data-solid-style={style.solidStyle}
					data-border={style.border}
					data-surface={style.surface}
					data-transition={style.transition}
					className={classNames(
						primary.variable,
						secondary ? secondary.variable : '',
						tertiary ? tertiary.variable : '',
						code.variable,
						'dark:data-device-dark')}>
					
						<Flex 
							as="body"
							fillWidth margin="0" padding="0"
							direction="column">
							<Background
								mask={{
									cursor: neweffects.mask.cursor,
									x: neweffects.mask.x,
									y: neweffects.mask.y,
									radius: neweffects.mask.radius,
								}}
								gradient={{
									display: neweffects.gradient.display,
									x: neweffects.gradient.x,
									y: neweffects.gradient.y,
									width: neweffects.gradient.width,
									height: neweffects.gradient.height,
									tilt: neweffects.gradient.tilt,
									colorStart: neweffects.gradient.colorStart,
									colorEnd: neweffects.gradient.colorEnd,
									opacity: neweffects.gradient.opacity as
									| 0
									| 10
									| 20
									| 30
									| 40
									| 50
									| 60
									| 70
									| 80
									| 90
									| 100,
								}}
								
								/>
							<Flex
								fillWidth
								minHeight="16">
							</Flex>
							<RouteGuard>
							<Header/>
							<Flex
								zIndex={0}
								fillWidth paddingY="l" paddingX="l"
								justifyContent="center" flex={1}>
								<Flex
									justifyContent="center"
									fillWidth minHeight="0">
										
											{children}
											<Analytics />

								</Flex>
							</Flex>
							<Footer/>
							</RouteGuard>
						</Flex>
				</Flex>
			</NextIntlClientProvider>
		</ConfigProvider>
	);
}



					{/*  */}
					{/* <Background
						gradient={effects.gradient}
						dots={effects.dots}
						lines={effects.lines}/> */}