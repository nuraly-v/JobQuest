
import React from 'react';

const Tasks = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tasks</h1>
        <p className="text-muted-foreground">Manage your job search related tasks</p>
      </div>
      
      <div className="border border-dashed rounded-lg p-8 md:p-12 flex flex-col items-center justify-center min-h-[300px]">
        <h3 className="font-medium text-lg md:text-xl mb-3">Task Management Coming Soon</h3>
        <p className="text-muted-foreground text-center max-w-lg">
          Track interview preparations, follow-ups, networking events, and more. This feature is currently under development.
        </p>
      </div>
    </div>
  );
};

export default Tasks;
