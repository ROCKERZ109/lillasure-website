"use client";
import { logOut } from "@/lib/auth";
import { auth, db } from "@/lib/firebase";
import { UserData } from "@/types";
import { create } from "domain";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { Phone } from "lucide-react";
import { cookies } from "next/headers";
import { seteuid } from "process";
import {
    act,
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import { email } from "zod";

interface UserContextType {
    setUser: (userData: UserData) => void;
    clearUser: () => void;
    loading: boolean;
    user: UserData;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}
interface UserState {
    user: UserData;
    type: string;
}

type UserAction = { type: "SET_USER"; payload: UserData } |
{ type: "CLEAR_USER"; payload: UserData };

function userReducer(user: UserData, action: UserAction) {
    switch (action.type) {
        case "SET_USER":
            return {
                ...user,
                name: action.payload.name,
                phone: action.payload.phone,
                email: action.payload.email,
                uid: action.payload.uid,
            };
        case "CLEAR_USER":

            return {
                ...user,
                name: action.payload.name,
                phone: action.payload.phone,
                email: action.payload.email,
                uid: action.payload.uid,
            };

        default:
            // @ts-ignore  
            throw Error("Unknown action: " + action.type);
    }
}

export function UserProvider({ children }: UserProviderProps) {
    const [loading, setLoading] = useState(true);
    const [user, dispatch] = useReducer(userReducer, {
        email: "",
        name: "",
        phone: "",
        uid: ""
    });
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setLoading(false);

                try {

                    const q = query(
                        collection(db, process.env.NEXT_PUBLIC_USER_DATABASE as string),
                        where("uid", "==", user.uid),
                    );

                    const querySnapshot = await getDocs(q);

                    querySnapshot.forEach((doc) => {

                        if (doc.exists()) {
                            const userData = doc.data();
                            dispatch({
                                type: "SET_USER",
                                payload: {
                                    email: user.email || "",
                                    name: userData.name || "",
                                    phone: userData.phone || "",
                                    uid: userData.uid || "",
                                },
                            });
                        } else {
                            // User exists in Auth but not in Firestore (edge case)
                            dispatch({
                                type: "SET_USER",
                                payload: {
                                    email: user.email || "",
                                    name: "",
                                    phone: "",
                                    uid: ""
                                },
                            });
                        }
                    });
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    dispatch({
                        type: "CLEAR_USER",
                        payload: { name: "", email: "", phone: "", uid: "" },
                    });
                }
            } else {
                // ✅ User logged out
                dispatch({
                    type: "CLEAR_USER",
                    payload: { name: "", email: "", phone: "", uid: "" },
                });
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [onAuthStateChanged]);

    const setUser = (user: UserData) => {
        dispatch({
            type: "SET_USER",
            payload: { name: user.name, email: user.email, phone: user.phone, uid: user.uid },
        });
    };
    const clearUser = async () => {
        await logOut()
        dispatch({
            type: "CLEAR_USER",
            payload: { name: "", email: "", phone: "", uid: "" },
        });
    };


    return (
        <UserContext.Provider value={{ setUser, clearUser, user, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function userContext() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("UserContext must be used within a UserProvider");
    }
    return context;
}
// function getCookies() {
//     const cookieStore = cookies()
//     const user = cookieStore.get('rememberMe')
//     if (user) return user;
//     return null;
// }
