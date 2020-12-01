import React from 'react';
import { FieldArray, Form, Formik, Field } from 'formik';
import * as Yup from 'yup';

const validateSchema = Yup.object({
  settings: Yup.array().of(
    Yup.object({
      url: Yup.string().required(),
    })
  ),
});

export function SettingsForm({ onSubmit, pages }) {
  return (
    <div className="App">
      <Formik
        validationSchema={validateSchema}
        initialValues={{
          settings: [],
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <FieldArray name="settings">
            {({ push, remove, form }) => (
              <>
                {console.log(form) || null}
                {form.values.settings.map((rule, index) => (
                  <div>
                    <Field as="select" name={`settings[${index}].page`}>
                      {pages.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                      <option value="custom">Custom</option>
                    </Field>
                    {form.values.settings[index].page === 'custom' && (
                      <>
                        <Field as="select" name={`settings[${index}].action`}>
                          <option value="contains">Contains</option>
                          <option value="exactMatch">Exact match</option>
                        </Field>
                        <Field type="text" name={`settings[${index}].url`} />
                        {form.touched.settings[index]?.url &&
                          form.errors.settings[index]?.url && (
                            <div>{form.errors.settings[index]?.url}</div>
                          )}
                      </>
                    )}

                    <button onClick={() => remove(index)}>X</button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    push({
                      page: pages[0]?.id,
                      action: 'contains',
                      url: '',
                    })
                  }
                >
                  New Rule
                </button>
              </>
            )}
          </FieldArray>
        </Form>
      </Formik>
    </div>
  );
}
