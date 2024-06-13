document.getElementById('fileInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const data = JSON.parse(e.target.result);
    displayData(data);
  };

  reader.readAsText(file);
}

function displayData(data) {
  document.getElementById('username').textContent = data.user.username;
  document.getElementById('created-at').textContent = new Date(parseInt(data.user.created_at)).toLocaleString();
  document.getElementById('total-mood-changes').textContent = data.user.total_mood_changes;
  document.getElementById('profile-private').textContent = data.user.settings.is_profile_private ? 'Yes' : 'No';
  document.getElementById('history-private').textContent = data.user.settings.is_history_private ? 'Yes' : 'No';

  const customLabels = document.getElementById('custom-labels');
  customLabels.innerHTML = '';
  data.user.settings.custom_labels.forEach(label => {
    const li = document.createElement('li');
    li.textContent = label;
    customLabels.appendChild(li);
  });

  const customColors = document.getElementById('custom-colors');
  customColors.innerHTML = '';
  data.user.settings.custom_colors.forEach(color => {
    const li = document.createElement('li');
    li.style.backgroundColor = `#${color.toString(16).padStart(6, '0')}`;
    li.textContent = `#${color.toString(16).padStart(6, '0')}`;
    customColors.appendChild(li);
  });

  const historyTable = document.getElementById('history-table').getElementsByTagName('tbody')[0];
  historyTable.innerHTML = '';
  data.history.forEach(record => {
    const row = historyTable.insertRow();
    const timestampCell = row.insertCell(0);
    const pleasantnessCell = row.insertCell(1);
    const energyCell = row.insertCell(2);

    timestampCell.textContent = new Date(parseInt(record.timestamp)).toLocaleString();
    pleasantnessCell.textContent = record.pleasantness.toFixed(2);
    energyCell.textContent = record.energy.toFixed(2);
  });

  document.getElementById('user-data').style.display = 'block';
}
