import { observer } from "mobx-react-lite";
import { Header, TabPane, Grid, Button, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProfileEditForm from "./ProfileEditForm";

export default observer(function ProfileAbout() {
    const {profileStore} = useStore();
    const {isCurrentUser, editing, setEditing, profile} = profileStore;
  
    return (
        <TabPane>
            <Segment clearing>
                <Grid>
                    <Grid.Column width={16}>
                                <Header floated='left' icon='user' content={'About ' + profile?.displayname} />
                                {isCurrentUser && (
                                    <Button floated="right" basic 
                                    color={!editing ? "green": "red"}
                                    content={!editing ? 'Edit Profile' : 'Cancel'}
                                    onClick={() => setEditing(!editing)} />
                                )}
                    </Grid.Column>
                </Grid>
                <ProfileEditForm />
            </Segment>    
        </TabPane>
    )
})