import React from "react";

export default function Footer() {
  return (
    <footer className="d-flex align-items-center justify-content-center py-3 my-4 border-top">
      <div className="d-flex ">
        <span className="mb-3 mb-md-0 text-body-secondary">
          © {new Date().getFullYear()} ADLShirts
        </span>
      </div>

    </footer>
  );
}
