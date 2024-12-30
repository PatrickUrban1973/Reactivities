import { observer } from 'mobx-react-lite';
import {Header, Item, Segment, Image} from 'semantic-ui-react'
import { format } from "date-fns";
import { UserActivity } from '../../app/models/profile';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    profileActivity: UserActivity
}

export default observer (function UserActivityDetail({profileActivity}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/${profileActivity.category}.jpg`} fluid style={activityImageStyle}/>
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={profileActivity.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(profileActivity.date!, 'dd MMM yyyy hh:mm')}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
        </Segment.Group>
    )
})
