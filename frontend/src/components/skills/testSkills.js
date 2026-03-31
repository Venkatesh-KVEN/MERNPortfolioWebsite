import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import '../skills/skills.css';

const CategorizedList = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { skills } = portfolioData || {};
  const { pageTitle, description } = portfolioData.skillSection || {};

  // Dynamic grouping
  const groupedSkills = useMemo(() => {
    return skills?.reduce((acc, skill) => {
      const categoryName = skill.category?.name || 'Other';

      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }

      acc[categoryName].push(skill);
      return acc;
    }, {});
  }, [skills]);

  // Color palette
  const colors = ['blue', 'cyan', 'green', 'yellow', 'pink', 'gray', 'orange', 'purple', 'red'];

  //Render items (ASC / DESC)
 const renderItems = (items, isReverse = false, cardIndex = 0) => {
  const orderedColors = isReverse ? [...colors].reverse() : colors;

  return (
    <div className="card-body">
      <ul className="list-unstyled px-3">
        {items?.map((item, index) => {
          // Add offset using cardIndex
          const colorIndex = (index + cardIndex) % orderedColors.length;
          const barColor = orderedColors[colorIndex];

          return (
            <li key={item._id} className="mb-3">
              <div className='d-flex justify-content-between mb-1'>
                <span>{item.name}</span>
                <span>{item.percentage}%</span>
              </div>

              <div className="progress">
                <div
                  className={`progress-bar ${barColor}`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

  if (!skills?.length) return null;

  return (
    <div className='container-fluid skills-bg text-white py-5' id="skills">
      <div className="container">
        
        <div className='text-center mb-5'>
          <h1>{pageTitle}</h1>
          <p>{description}</p>
        </div>

        {/* Dynamic Categories */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {Object.entries(groupedSkills || {}).map(([categoryName, items], index) => (
            <div key={categoryName} className='col'>
                <div className="card h-100 skills-card">
                
                <h5 className='text-center my-3'>{categoryName}</h5>

                {/* ✅ pass index */}
                {renderItems(items, index % 2 !== 0, index)}

                </div>
            </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default CategorizedList;