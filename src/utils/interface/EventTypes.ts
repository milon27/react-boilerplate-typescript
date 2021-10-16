// const EventTypes = {
//     :type 
// }


export type HandleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => void

export type HandleInputChnage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

export type StylePorps = React.CSSProperties

export type WrapperProps = { title: string } & React.ComponentProps<'div'> //similar to div with title props extra
