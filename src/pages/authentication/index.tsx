import SignIn from "./componets/sign-in";
import SignUp from "./componets/sign-up";

import './style.scss';

export default function Authentication() {
    return (
        <main className="authentication">
            <SignIn />
            <SignUp />
        </main >
    );
}
