import React from 'react'

export type TypeSetState<T> = React.Dispatch<React.SetStateAction<T>>
export type TypeReactChild = React.ReactNode
//React.FormEvent==TypeClickEvent
export type TypeClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>
export type TypeOnEventHandler = React.MouseEventHandler<HTMLElement>
//on change
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export type TypeOnChangeHandler = React.ChangeEventHandler<FormControlElement>


