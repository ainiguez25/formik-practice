import React, { useState } from "react";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ConfirmationModal";

const IntermediateForm = () => {
  //Modal Confirmacion
  const [title, setTitle] = useState("Confirmation");
  const [message, setMessage] = useState("Are you sure you do this?");
  const [type, setType] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const [formData, setFormData] = useState(null);
  const [formActions, setFormActions] = useState(null);

  const validateErrors = (values) => {
    const errors = {};
    if (!values.nombre) errors.nombre = "Nombre requerido";
    if (!values.edad) errors.edad = "Edad requerida";
    return errors;
  };

  const handleConfirm = (confir) => {
    if (!confir) {
      toast.error("Formulario no enviado");
      formActions.setSubmitting(false);
      console.log("Form data not submitted:", formData);
      setShowModal(false);
    } else {
      toast.success("Formulario enviado correctamente");
      formActions.setSubmitting(false);
      formActions.resetForm();
      setShowModal(false);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showModal}
        toggle2={toggleModal}
        message={message}
        title={title}
        type={type}
        toggleConfirmation={handleConfirm}
      />

      <Formik
        initialValues={{ nombre: "", edad: "" }}
        validate={validateErrors}
        onSubmit={(values, actions) => {
          setFormData(values);
          setFormActions(actions);
          toggleModal();
          setTitle("Confirmación de Envío");
          setMessage("¿Estás seguro de que deseas enviar este formulario?");
          setType(1);
        }}>
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
              className="bg-green-500 text-white px-4 py-2 rounded">
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default IntermediateForm;
