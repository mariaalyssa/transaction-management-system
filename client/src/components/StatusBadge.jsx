function StatusBadge({ status }) {
  const statusText = status || "Unknown";
  return (
    <span className={`status-badge ${statusText.toLowerCase()}`}>
      {statusText}
    </span>
  );
}

export default StatusBadge;