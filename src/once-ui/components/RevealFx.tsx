// "use client";

// import React, { useState, useEffect, forwardRef } from 'react';
// import { SpacingToken } from '../types';
// import styles from './RevealFx.module.scss';

// interface RevealFxProps extends React.HTMLAttributes<HTMLSpanElement> {
// 	children: React.ReactNode;
// 	speed?: 'slow' | 'medium' | 'fast';
// 	delay?: number;
// 	translateY?: number | SpacingToken;
// 	trigger?: boolean;
// 	style?: React.CSSProperties;
// 	className?: string;
// }

// const RevealFx = forwardRef<HTMLSpanElement, RevealFxProps>(({
// 	children,
// 	speed = 'medium',
// 	delay = 0,
// 	translateY,
// 	trigger,
// 	style,
// 	className,
// 	...rest
// }, ref) => {
// 	const [isRevealed, setIsRevealed] = useState(false);

// 	useEffect(() => {
// 		const timer = setTimeout(() => {
// 			setIsRevealed(true);
// 		}, delay * 1000);

// 		return () => clearTimeout(timer);
// 	}, [delay]);

// 	useEffect(() => {
// 		if (trigger !== undefined) {
// 			setIsRevealed(trigger);
// 		}
// 	}, [trigger]);

// 	const getSpeedDuration = () => {
// 		switch (speed) {
// 			case 'fast':
// 				return '1s';
// 			case 'medium':
// 				return '2s';
// 			case 'slow':
// 				return '3s';
// 			default:
// 				return '2s';
// 		}
// 	};

// 	const getTranslateYValue = () => {
// 		if (typeof translateY === 'number') {
// 			return `${translateY}rem`;
// 		} else if (typeof translateY === 'string') {
// 			return `var(--static-space-${translateY})`;
// 		}
// 		return undefined;
// 	};

// 	const translateValue = getTranslateYValue();

// 	const combinedClassName = `${styles.revealFx} ${isRevealed ? styles.revealed : styles.hidden} ${className || ''}`;

// 	const revealStyle: React.CSSProperties = {
// 		transitionDuration: getSpeedDuration(),
// 		transform: isRevealed ? 'translateY(0)' : `translateY(${translateValue})`,
// 		...style,
// 	};

// 	return (
// 		<span
// 			ref={ref}
// 			aria-hidden="true"
// 			style={revealStyle}
// 			className={combinedClassName}
// 			{...rest}>
// 			{children}
// 		</span>
// 	);
// });

// RevealFx.displayName = "RevealFx";
// export { RevealFx };

'use client';

import React, {
	useState,
	useEffect,
	useRef,
	forwardRef,
	useCallback,
} from 'react';
import { SpacingToken } from '../types';
import styles from './RevealFx.module.scss';

interface RevealFxProps extends React.HTMLAttributes<HTMLSpanElement> {
	children: React.ReactNode;
	speed?: 'slow' | 'medium' | 'fast';
	delay?: number;
	translateY?: number | SpacingToken;
	trigger?: boolean;
	style?: React.CSSProperties;
	className?: string;
}

const RevealFx = forwardRef<HTMLSpanElement, RevealFxProps>(({
	children,
	speed = 'medium',
	delay = 0,
	translateY,
	trigger,
	style,
	className,
	...rest
}, ref) => {
	const [isRevealed, setIsRevealed] = useState(false);
	const localRef = useRef<HTMLSpanElement | null>(null);
	const combinedRef = useCallback((node: HTMLSpanElement) => {
		localRef.current = node;
		if (typeof ref === 'function') {
			ref(node);
		} else if (ref) {
			(ref as React.MutableRefObject<HTMLSpanElement | null>).current = node;
		}
	}, [ref]);

	// Choose the actual delay to use
	const revealDelay = delay * 1000;

	// Intersection observer logic
	useEffect(() => {
		if (trigger !== undefined) return; // If trigger is manually controlled, skip auto

		const node = localRef.current;
		if (!node) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						setIsRevealed(true);
					}, revealDelay);
					observer.disconnect(); // Trigger once
				}
			},
			{ threshold: 0.25 }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [trigger, revealDelay]);

	// Manual trigger override
	useEffect(() => {
		if (trigger !== undefined) {
			if (trigger) {
				setTimeout(() => setIsRevealed(true), revealDelay);
			} else {
				setIsRevealed(false);
			}
		}
	}, [trigger, revealDelay]);

	const getSpeedDuration = () => {
		switch (speed) {
			case 'fast': return '1s';
			case 'medium': return '2s';
			case 'slow': return '3s';
			default: return '2s';
		}
	};

	const getTranslateYValue = () => {
		if (typeof translateY === 'number') {
			return `${translateY}rem`;
		} else if (typeof translateY === 'string') {
			return `var(--static-space-${translateY})`;
		}
		return '1rem'; // fallback
	};

	const translateValue = getTranslateYValue();

	const combinedClassName = `${styles.revealFx} ${isRevealed ? styles.revealed : styles.hidden} ${className || ''}`;

	const revealStyle: React.CSSProperties = {
		transitionDuration: getSpeedDuration(),
		transform: isRevealed ? 'translateY(0)' : `translateY(${translateValue})`,
		opacity: isRevealed ? 1 : 0,
		...style,
	};

	return (
		<span
			ref={combinedRef}
			aria-hidden="true"
			style={revealStyle}
			className={combinedClassName}
			{...rest}>
			{children}
		</span>
	);
});

RevealFx.displayName = "RevealFx";
export { RevealFx };
