import {useState} from 'react'
import {EyeIcon, EyeOffIcon} from '@heroicons/react/solid'

function usePasswordToggle () {
    const [visible, setvisibility] = useState(false);

    const Icon = visible ? EyeOffIcon : EyeIcon;

    const toggleVisibility = () => {
        setvisibility(prevVisibility => !prevVisibility);
    };

    const InputType = visible ? "text" : "password";

    return [InputType, Icon, toggleVisibility];
}

export default usePasswordToggle;
