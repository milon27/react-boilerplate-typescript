import React from 'react'

export interface iMain extends React.ComponentProps<'div'> {
    title: string,
    children: React.ReactNode
}

export default function Main({ children, title }: iMain) {
    return (
        <>
            {children}
        </>
    )
}