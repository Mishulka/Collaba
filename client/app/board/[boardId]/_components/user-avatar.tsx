import { Hint } from "@/components/ui/hint";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

interface UserAvatarProps {
    src?: string;
    name?: string;
    fallback?: string;
    borderColor?: string;
};

export const UserAvatar = ({
    src,
    name,
    fallback,
    borderColor,
}: UserAvatarProps) => {
    return (
        <Hint label={name || "Anonymous"} side="bottom" sideOffset={10}>
            <Avatar className="h-8 w-8 border-2">
                <AvatarImage src={src} />
                <AvatarFallback className="font-xs">
                    {fallback}
                </AvatarFallback>
            </Avatar>
        </Hint>
    )
}