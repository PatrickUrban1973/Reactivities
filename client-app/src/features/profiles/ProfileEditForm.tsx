import { useEffect, useState } from "react";
import { Button,Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { useStore } from "../../app/stores/store";
import { ProfileFormValues } from "../../app/models/profile";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";

export default observer(function ProfileEditForm(){
  const {profileStore} = useStore();
  const {updateProfile, editing, profile} = profileStore;

  const [editProfile, setProfile] = useState<ProfileFormValues>(new ProfileFormValues())
  
  const validationSchema = Yup.object({
    displayname: Yup.string().required('The display name is required'),
  })

  useEffect(() => {
    setProfile(new ProfileFormValues(profile!))
  }, [])

  function handleFormSubmit(profile: ProfileFormValues) {
    updateProfile(profile);
    setProfile(new ProfileFormValues(profile))
  }

  return (
        <>
            {editing &&(
                <Formik 
                    validationSchema={validationSchema}
                    enableReinitialize 
                    initialValues={editProfile} 
                    onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name="displayname" placeholder="Display Name" />
                    <MyTextArea rows={3} placeholder='Bio' name='bio' />
                    <Button disabled={isSubmitting || !isValid || !dirty}  loading={isSubmitting} floated="right" positive type="submit" content='Submit' />
                </Form>
                )}
                </Formik>)}
            {!editing &&(
                <Container fluid text content={profile?.bio} style={{whiteSpace: 'pre-wrap'}} />
            )}
        </>
    )
})