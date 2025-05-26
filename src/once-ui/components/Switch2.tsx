"use client";

import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { Flex, InteractiveDetails, InteractiveDetailsProps, Icon } from '.';
import styles from './Switch2.module.scss';

interface Switch2Props extends Omit<InteractiveDetailsProps, 'onClick'> {
    className?: string;
    isChecked: boolean;
    reverse?: boolean;
    onToggle: () => void;
    ariaLabel?: string;
    iconChecked?: string;
    iconUnchecked?: string;
     style?: React.CSSProperties;
}

const Switch2 = forwardRef<HTMLDivElement, Switch2Props>(({
    className,
    isChecked,
    reverse = false,
    onToggle,
    ariaLabel = 'Toggle switch',
    iconChecked,
    iconUnchecked,
    style,
    ...interactiveDetailsProps
}, ref) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onToggle();
        }
    };

    return (
        <Flex
            ref={ref}
            gap="4"
            alignItems="center"
            justifyContent={reverse ? 'space-between' : 'auto'}
            fillWidth={reverse}
            className={classNames(styles.container, className, {
                [styles.reverse]: reverse,
            })}
            style={style}
            onClick={onToggle}
            role="switch"
            aria-checked={isChecked}
            aria-label={ariaLabel}
            tabIndex={-1}>
            <div
                className={classNames(styles.switch, {
                    [styles.checked]: isChecked,
                })}>
                <div
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    className={classNames(styles.toggle, {
                        [styles.checked]: isChecked,
                    })}>
                    {isChecked && iconChecked && <Icon name={iconChecked} size="s" />}
                    {!isChecked && iconUnchecked && <Icon name={iconUnchecked} size="s" />}
                </div>
            </div>
            {/* {interactiveDetailsProps.label && (
                <InteractiveDetails
                    {...interactiveDetailsProps}
                    onClick={() => {}} />
            )} */}
        </Flex>
    );
});

Switch2.displayName = "Switch2";

export { Switch2 };