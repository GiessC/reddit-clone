import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import { useRouter } from 'next/router';
import styles from './Button.module.scss';

export type ButtonSizeType = 'small' | 'medium' | 'large';
export type ButtonColorType = 'primary' | 'secondary' | 'error';

export interface ButtonProps extends ButtonBaseProps {
    color?: ButtonColorType;
    size?: ButtonSizeType;
    fullWidth?: boolean;
    href?: string;
}

const Button = ({ className='', color='primary', size='medium', fullWidth=false, href, onClick, children, ...props }: ButtonProps) => {
    const router = useRouter();
    
    return (
        <ButtonBase
            classes={{
                root: `button ${color} ${size} ${fullWidth ? 'fullWidth' : ''} ${className}`,
                // root: `rc-btn-${color} ${size} ${fullWidth ? 'fullWidth' : ''} ${className}`,
                disabled: `rc-btn-${color} ${size} ${fullWidth ? 'fullWidth' : ''} disabled ${className}`,
                focusVisible: `rc-btn-${color} ${size} ${fullWidth ? 'fullWidth' : ''} focus-visible ${className}`,
            }}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                if (onClick) {
                    onClick(event);
                } else if (href) {
                    router.push(href);
                }
            }}
            {...props}
        >
            {children}
        </ButtonBase>
    );
};

export default Button;