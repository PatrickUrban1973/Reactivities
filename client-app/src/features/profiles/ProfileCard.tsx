import { observer } from "mobx-react-lite";
import { Profile } from "../../app/models/profile";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

interface Props {
    profile: Profile
}

function truncate(str: string | undefined, n: number){
    if (str)
        return (str.length > n) ? str.slice(0, n-1) + '...' : str;

    return null;
};

export default observer(function ProfileCard({profile}: Props) {
    return(
        <Card as={Link} to={`/profiles/${profile.username}`}> 
            <Image src={profile.image || '/assets/user.png'} />
            <Card.Content>
                <Card.Header>{profile.displayname}</Card.Header>
                <Card.Description>
                    {truncate(profile.bio, 25)}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user' />
                {profile.followersCount} followers
            </Card.Content>
            <FollowButton profile={profile} />
        </Card>
    )
})