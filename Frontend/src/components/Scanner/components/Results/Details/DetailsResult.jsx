import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import { sections, tabs } from '../../../utils/';

const DetailsResult = ({ jsonData }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('product');

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const hasContent = (Component) => {
    try {
      // Check if the component has any content to render with the provided jsonData
      const element = <Component jsonData={jsonData} />;
      return Boolean(React.isValidElement(element));
    } catch {
      return false;
    }
  };

  const filteredSections = sections.filter(({ Component }) => hasContent(Component));
  const filteredTabs = tabs.filter(({ component: TabComponent }) => hasContent(TabComponent));

  const renderAccordion = (id, title, Component) => (
    hasContent(Component) && (
      <div
        key={id}
        className={`rounded-lg mb-2 shadow-lg shadow-blue-500/50 ${
          expanded === id ? 'bg-gray-900' : 'bg-[#151515]'
        }`}
      >
        <Accordion
          expanded={expanded === id}
          onChange={handleAccordionChange(id)}
          className="bg-transparent text-white"
          sx={{ padding: '0', margin: '0' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon className="text-white" />} id={`${id}-header`}>
            <Typography className="text-base sm:text-lg">{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Fade in={expanded === id} timeout={400}>
              <div>
                <Component jsonData={jsonData} />
              </div>
            </Fade>
          </AccordionDetails>
        </Accordion>
      </div>
    )
  );

  const renderTabs = () => (
    <div>
      <div className="flex justify-around space-x-2">
        {filteredTabs.map(({ name, key }) => (
          <button
            key={key}
            className={`p-2 text-sm sm:text-base rounded ${
              activeTab === key ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300'
            }`}
            onClick={() => setActiveTab(key)}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {filteredTabs.map(({ key, component: TabComponent }) =>
          activeTab === key ? <TabComponent key={key} jsonData={jsonData} /> : null
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen px-4 sm:px-8 py-6">
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredSections.map(({ id, title, Component }) => renderAccordion(id, title, Component))}

        {filteredTabs.length > 0 && filteredTabs.some(({ component: TabComponent }) => hasContent(TabComponent)) && (
          <div
            className={`rounded-lg mb-2 shadow-lg shadow-blue-500/50 ${
              expanded === 'nsrl' ? 'bg-gray-900' : 'bg-[#151515]'
            }`}
          >
            <Accordion
              expanded={expanded === 'nsrl'}
              onChange={handleAccordionChange('nsrl')}
              className="bg-transparent text-white"
              sx={{ padding: '0', margin: '0' }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon className="text-white" />} id="nsrl-header">
                <Typography className="text-base sm:text-lg">National Software Reference Library Info</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Fade in={expanded === 'nsrl'} timeout={400}>
                  {renderTabs()}
                </Fade>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsResult;
