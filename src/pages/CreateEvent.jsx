import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormError } from "../Utils/EventUtils";

const initialValues = {

}

const validationSchema = Yup.object().shape({

})

const CreateEvent = () => {


const handleCreatEvent = () =>{

}

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-400">
        Create a New Event
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreatEvent}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex items-center justify-center">
              <label>Event Title</label>
              <Field 
                id="eventtitle"
                name= "eventtitle"
                type="text"
                class="input"
                placeholder="Enter name of your event"
              />
              <FormError name="fullname" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEvent;
