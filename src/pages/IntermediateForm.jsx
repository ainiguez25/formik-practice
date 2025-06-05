import React, { useState } from "react";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";

const ConfirmationModal = ({ show, onConfirm, onCancel, message }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-4 rounded shadow">
        <p>{message}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1 bg-gray-300 rounded">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-3 py-1 bg-blue-500 text-white rounded">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

const IntermediateForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [formActions, setFormActions] = useState(null);

  const validateErrors = (values) => {
    const errors = {};
    if (!values.nombre) errors.nombre = "Nombre requerido";
    if (!values.edad) errors.edad = "Edad requerida";
    return errors;
  };

  const handleConfirm = () => {
    toast.success("Formulario enviado correctamente");
    formActions.setSubmitting(false);
    setShowModal(false);
  };

  return (
    <>
      <ConfirmationModal
        show={showModal}
        message="¿Desea enviar este formulario?"
        onCancel={() => {
          formActions.setSubmitting(false);
          setShowModal(false);
        }}
        onConfirm={handleConfirm}
      />

      <Formik
        initialValues={{ nombre: "", edad: "" }}
        validate={validateErrors}
        onSubmit={(values, actions) => {
          setFormData(values);
          setFormActions(actions);
          setShowModal(true);
        }}
      >
        {({ handleChange, values, errors, touched, isSubmitting }) => (
          <Form className="max-w-md space-y-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              onChange={handleChange}
              value={values.nombre}
              className="w-full border rounded px-3 py-2"
            />
            {errors.nombre && touched.nombre && (
              <p className="text-red-500 text-sm">{errors.nombre}</p>
            )}

            <input
              type="number"
              name="edad"
              placeholder="Edad"
              onChange={handleChange}
              value={values.edad}
              className="w-full border rounded px-3 py-2"
            />
            {errors.edad && touched.edad && (
              <p className="text-red-500 text-sm">{errors.edad}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default IntermediateForm;