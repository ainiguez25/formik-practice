// forms/BasicForm.jsx
import React from "react";
import { Formik, Form } from "formik";

const BasicForm = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "" }}
      onSubmit={(values) => {
        alert("Formulario básico enviado correctamente");
        console.log("values", values);
      }}>
      {({ handleChange, values }) => (
        <Form className="space-y-4 max-w-md">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={handleChange}
            value={values.name}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            onChange={handleChange}
            value={values.email}
            className="w-full border rounded px-3 py-2"
          />
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded">
              Enviar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BasicForm;
