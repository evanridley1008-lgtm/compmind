"use client";

import type { ReactNode } from "react";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  icon?: ReactNode;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = false,
  icon,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onCancel();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="p-6">
          {icon && (
            <div
              className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
                danger
                  ? "bg-red-50 text-red-600"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              {icon}
            </div>
          )}

          <h2
            id="confirm-modal-title"
            className="text-lg font-semibold text-slate-950"
          >
            {title}
          </h2>

          {description && (
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={`inline-flex min-h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
              danger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}

            {loading ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
