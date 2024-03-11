const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

const apiKey = 'sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912';

app.get('/v1/api/forms/:formId/filteredResponses', async (req, res) => {
    debugger;
  const filters = req.query || null;
  const formId = req.params.formId;
  const responses = await fetchResponses(apiKey, formId, filters);
  res.json(responses);
});

const fetchResponses = async (apiKey, formId, filters = null) => {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  };

  const params = filters ? { filters } : {};
   FilterClauseType = [{
	id: '4KC356y4M6W8jHPKx9QfEy',
	condition: 'equals',
	value: 'Nothing much to share yet!'
}]
  try {
    const response = await axios.get(`https://api.fillout.com/v1/api/forms/${formId}/submissions`, {
      headers,
      FilterClauseType,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error fetching responses. Status code: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error('An error occurred while fetching responses:', error.message);
    return null;
  }
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
