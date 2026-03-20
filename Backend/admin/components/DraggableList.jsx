import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from 'axios'
import { Box, Text, Button, Badge } from '@adminjs/design-system'
import { useNavigate } from 'react-router-dom'



const DraggableList = (props) => {
  const navigate = useNavigate()

  const [records, setRecords] = useState([])

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          '/admin/api/resources/Project/actions/list',
          { withCredentials: true }
        )

        const data = res.data.records || []

        // ✅ NORMALIZE ID (IMPORTANT)
        const normalized = data.map((r) => ({
          ...r,
          id: r.id || r.params?._id,
        }))

        const sorted = normalized.sort(
          (a, b) => (a.params?.order || 0) - (b.params?.order || 0)
        )

        setRecords(sorted)
      } catch (err) {
        console.error('FETCH ERROR:', err)
      }
    }

    fetchProjects()
  }, [])

  // ✅ DRAG FUNCTION
  const onDragEnd = async (result) => {
    if (!result.destination) return

    const oldRecords = [...records]

    const items = Array.from(records)
    const [moved] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, moved)

    const updatedItems = items.map((item, index) => ({
      ...item,
      params: { ...item.params, order: index },
    }))

    setRecords(updatedItems)

    try {
      await axios.post('/project/order/reorder-projects', {
        items: updatedItems.map((item, index) => ({
          id: item.id,
          order: index,
        })),
      })
    } catch (err) {
      console.error(err)
      setRecords(oldRecords)
      alert('Failed to save order')
    }
  }

const handleDelete = async (id) => {
  if (!window.confirm('Delete this project?')) return;

  try {
    const res = await fetch(`/api/project/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (data.success) {
      window.location.reload(); // ✅ SIMPLE FIX
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <Box padding="lg">
      {!records.length && <Text>Loading projects...</Text>}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>

              {records.map((record, index) => {
                const id = record.id
                if (!id) return null

                return (
                  <Draggable
                    key={id}
                    draggableId={String(id)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        marginBottom="lg"
                        padding="lg"
                        style={{
                          ...provided.draggableProps.style, // ✅ MUST HAVE
                          background: snapshot.isDragging ? '#f0f8ff' : '#fff',
                          borderRadius: '12px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                          display: 'flex',
                          gap: '20px',
                          alignItems: 'center',
                        }}
                      >

                        {/* ✅ DRAG HANDLE */}
                        <Text
                          {...provided.dragHandleProps}
                          style={{ fontSize: '20px', cursor: 'grab' }}
                        >
                          ☰
                        </Text>

                        {/* IMAGE */}
                        {record?.params?.imageKey && (
                          <img
                            src={`/uploads/${record.params.imageKey}`}
                            alt="project"
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                            }}
                          />
                        )}

                        {/* CONTENT */}
                        <Box flex="1">
                          <Text fontWeight="bold">
                            #{(record?.params?.order ?? 0)+1} — {record?.params?.title}
                          </Text>

                          <Text variant="sm" color="grey">
                            {record?.params?.description}
                          </Text>

                          <Box
                            marginTop="sm"
                            style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}
                          >
                            {(record?.params?.technologies || []).map((tech, i) => (
                              <Badge key={i}>{tech}</Badge>
                            ))}
                          </Box>
                        </Box>

                        {/* ACTIONS */}
                        <Box style={{ display: 'flex', gap: '8px' }}>
                          <Button
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/resources/Project/records/${id}/edit`)
                            }
                          >
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="light"
                            onClick={() =>
                              navigate(`/admin/resources/Project/records/${id}/show`)
                            }
                          >
                            Show
                          </Button>

                          <Button
                            size="sm"
                            variant="danger"
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                               handleDelete(id)
                              }
                          >
                            Delete
                          </Button>
                        </Box>

                      </Box>
                    )}
                  </Draggable>
                )
              })}

              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}



export default DraggableList