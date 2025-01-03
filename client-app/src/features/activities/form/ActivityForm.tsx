import { useEffect, useState } from "react";
import { Button,Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ActivityFormValues } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function ActivityForm(){
  const {activityStore} = useStore();
  const {createActivity, updateActivity, 
    loadActivity, loadingInitial} = activityStore;
  const{id} = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues())

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is rquired'),
    description: Yup.string().required('The activity description is rquired'),
    category: Yup.string().required('The activity category is rquired'),
    date: Yup.string().required('The activity date is rquired').nullable(),
    city: Yup.string().required('The activity city is rquired'),
    venue: Yup.string().required('The activity venue is rquired'),
  })

  useEffect(() => {
    if(id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)))
  }, [id, loadActivity])

   function handleFormSubmit(activity: ActivityFormValues) {
     if (!activity.id) {
       activity.id = uuid();
       createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
     }
     else{
       updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
     }
    }

  if (loadingInitial) return <LoadingComponent content="Loading activity..."/>

  return (
      <Segment clearing>
        <Header content='Activity details' sub color="teal" />
        <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={activity} 
            onSubmit={values => handleFormSubmit(values)}>
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
              <MyTextInput name="title" placeholder="Title" />
              <MyTextArea rows={3} placeholder='Description' name='description' />
              <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
              <MyDateInput 
                  placeholderText="Date"
                  name='date' 
                  showTimeSelect
                  timeCaption="time"
                  dateFormat='MMM d, yyyy hh:mm'
              />
              <Header content='Location details' sub color="teal" />
              <MyTextInput placeholder='City' name='city' />
              <MyTextInput placeholder='Venue' name='venue' />
              <Button disabled={isSubmitting || !isValid || !dirty}  loading={isSubmitting} floated="right" positive type="submit" content='Submit' />
              <Button as={Link} to='/activities' floated="right" type="button" content='Cancel' />
          </Form>
          )}
        </Formik>
    </Segment>    
    )
})