import React, { useState } from "react";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ConfirmationModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

const AdvancedForm = () => {
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
    values.ingredientes.forEach((ingrediente, index) => {
      if (!ingrediente.nombre) {
        errors[`ingredientes[${index}].nombre`] = "Nombre requerido";
      }
      if (!ingrediente.cantidad) {
        errors[`ingredientes[${index}].cantidad`] = "Cantidad requerida";
      }
    });
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
        initialValues={{ ingredientes: [{ nombre: "", cantidad: "" }] }}
        validate={validateErrors}
        onSubmit={(values, actions) => {
          setFormData(values);
          setFormActions(actions);
          toggleModal();
          setTitle("Confirmación de Envío");
          setMessage("¿Estás seguro de que deseas enviar este formulario?");
          setType(1);
        }}>
        {({ handleChange, values, errors, isSubmitting }) => (
          <Form className="max-w-lg space-y-4">
            <button
              type="button"
              onClick={() => {
                values.ingredientes.push({ nombre: "", cantidad: "" });
                handleChange({
                  target: { name: "ingredientes", value: values.ingredientes },
                });
              }}
              className="bg-blue-400 text-white px-3 py-1 rounded mt-2">
              <PlusCircleIcon
                className="h-6 w-6 hover:font-semibold hover:scale-110 transform transition-all duration-500 ease-in-out"
              />
            </button>
            {values.ingredientes.map((ingrediente, index) => (
              <div key={index} className="flex space-x-2">
                <div className="flex flex-col">
                  <input
                    name={`ingredientes[${index}].nombre`}
                    placeholder="Nombre"
                    value={ingrediente.nombre}
                    onChange={(e) => {
                      const ingredientes = [...values.ingredientes];
                      ingredientes.map((ing, i) => {
                        if (i === index) {
                          ing.nombre = e.target.value;
                        }
                        return ing;
                      });
                      handleChange({
                        target: { name: "ingredientes", value: ingredientes },
                      });
                    }}
                    className="flex-1 border rounded px-2 py-1"
                  />
                  {errors.ingredientes && errors.ingredientes[index] && (
                    <p className="text-red-500 text-sm">
                      {errors.ingredientes[index].nombre}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    name={`ingredientes[${index}].cantidad`}
                    placeholder="Cantidad"
                    value={ingrediente.cantidad}
                    onChange={(e) => {
                      const ingredientes = [...values.ingredientes];
                      ingredientes.map((ing, i) => {
                        if (i === index) {
                          ing.cantidad = e.target.value;
                        }
                        return ing;
                      });
                      handleChange({
                        target: { name: "ingredientes", value: ingredientes },
                      });
                    }}
                    className="flex-1 border rounded px-2 py-1"
                  />
                  {errors.ingredientes && errors.ingredientes[index] && (
                    <p className="text-red-500 text-sm">
                      {errors.ingredientes[index].cantidad}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const ingredientes = [...values.ingredientes];
                    ingredientes.splice(index, 1);
                    handleChange({
                      target: { name: "ingredientes", value: ingredientes },
                    });
                  }}
                  className="text-red-500">
                  <TrashIcon
                    className="h-6 w-6 hover:font-semibold hover:scale-110 transform transition-all duration-500 ease-in-out"
                  />
                </button>
              </div>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 text-white px-4 py-2 rounded">
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AdvancedForm;
