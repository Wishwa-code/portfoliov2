//@ts-nocheck
"use client";

import React, { ReactNode, useEffect, useCallback, useRef, forwardRef, useState } from 'react';
import {Dialog} from '@/once-ui/components';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Flex, Heading, IconButton, Button, ButtonProps, Text, Input , Textarea} from '.';
import styles from './DialogBox.module.scss';

interface DialogButtonProps extends Partial<ButtonProps> {
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface DialogBoxProps {
    title?: string;
    description?: string;
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
}

const DialogBox: React.FC<DialogBoxProps> = forwardRef<HTMLDivElement, DialogBoxProps>(({
    title,
    description,
    style,
    className,
    children
}, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        
        if (newEmail && !validateEmail(newEmail)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handleOpen = () => setIsVisible(true);
    const handleClose = () => setIsVisible(false);

    return (
        <>
            <Button 
                onClick={handleOpen}
                size="s"
                variant="tertiary"
                label="Email"
                prefixIcon="email"

            >
                Open Dialog
            </Button>
            <Dialog
                ref={ref}
                isOpen={isVisible}
                onClose={handleClose}
                title={title}
                description={description}
                style={style}
                className={className}
            >
                <Flex direction="column" gap="16" className={styles.dialogContent}>
                    <Flex 
                        direction={{ base: 'column', md: 'row' }} 
                        gap="24" 
                        justifyContent="center"
                        paddingBottom='20'
                    >
                        <Button 
                            style={{width: '250px'}}
                            variant="secondary" 
                            prefixIcon="desktop"
                            href='mailto:wishwakankankanmge129@gmail.com'
                        >
                            Email client
                        </Button>
                        <Button 
                            style={{width: '250px'}}
                            variant="secondary" 
                            prefixIcon="browser"
                            href='https://mail.google.com/mail/u/0/#inbox?compose=new'
                        >
                            Open browser
                        </Button>
                        <Button
                            style={{width: '250px'}}
                            variant="secondary" 
                            prefixIcon="whatsapp"
                            href="https://wa.me/771631976?text=Hey!"
                        >
                            Whatspp
                        </Button>
                    </Flex>
                    {/* <Flex 
                        paddingBottom='4'
                        paddingTop='28'
                    >
                        <Text>
                            Or else you can just send a hello, I will reach out to you.
                        </Text>
                    </Flex> */}
                    
                    {/* <Flex direction="column" gap="12" paddingBottom='32'>
                        <Input
                            id="emailaddress"
                            label="Email"
                            value={email}
                            onChange={handleEmailChange}
                            errorMessage={emailError}
                        />
                        <Textarea
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            // className={styles.textarea}
                            rows={7}
                        />
                        <Button variant="primary">Send Message</Button>
                    </Flex> */}
                </Flex>
            </Dialog>
        </>
    );
});

DialogBox.displayName = "DialogBox";

export { DialogBox };