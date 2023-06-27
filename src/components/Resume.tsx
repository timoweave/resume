import {
  Box,
  Heading,
  Flex,
  IconButton,
  ButtonGroup,
  Spacer,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FieldValues } from 'react-hook-form';

import { useSupabaseSession } from '../hooks/useSupabaseSession';
import {
  ExperienceCard,
  ExperienceDrawer,
  ExperienceModal,
} from './ExperienceEditor';
import { ProfileCard, ProfileDrawer, ProfileModal } from './ProfileEditor';
import {
  EducationCard,
  EducationDrawer,
  EducationModal,
} from './EducationEditor';
import { UseEditor } from '../hooks/useEditor';
import { useEditorList } from '../hooks/useEditorList';
import React from 'react';

export type ResumeSectionProps<TRow extends FieldValues> = {
  title: string;
  editor?: UseEditor<TRow>;
  children: React.ReactNode;
};

export const ResumeSection = <TRow extends FieldValues>(
  props: ResumeSectionProps<TRow>,
): JSX.Element => {
  const { title, editor, children } = props;
  return (
    <Box w="100%">
      <Flex justify="stretch">
        <Heading size="md" pt="10px">
          {title}
        </Heading>
        <Spacer />
        {editor != null && (
          <ButtonGroup spacing="2" m="6px">
            <IconButton
              isRound
              icon={<AddIcon />}
              aria-label="create"
              title={`Add ${title}`}
              variant="outline"
              size="sm"
              onClick={() => editor.onOpenDrawer('CREATE')}
            />
          </ButtonGroup>
        )}
      </Flex>
      {React.Children.map(children, (child) => (
        <React.Fragment>{child}</React.Fragment>
      ))}
    </Box>
  );
};

export const Resume = (): JSX.Element => {
  const session = useSupabaseSession({
    profileID: '2988e1e8-1aa9-42b7-a57b-46a0f4d0cb09',
  });
  const resume = useEditorList({ session });
  const { profileList, experienceList, educationList } = session;
  const { educationEditor, experienceEditor } = resume;

  return (
    <Box pt="2rem" w="100%" h="100vh">
      <ResumeSection title="Profile">
        {profileList.map((prof) => (
          <ProfileCard
            key={prof.id}
            row={prof}
            resume={resume}
            session={session}
          />
        ))}
        <ProfileDrawer resume={resume} />
        <ProfileModal resume={resume} session={session} />
      </ResumeSection>

      <ResumeSection title="Experience" editor={experienceEditor}>
        {experienceList.map((exp) => (
          <ExperienceCard key={exp.id} row={exp} editor={experienceEditor} />
        ))}
        <ExperienceDrawer editor={experienceEditor} />
        <ExperienceModal editor={experienceEditor} />
      </ResumeSection>

      <ResumeSection title="Education" editor={educationEditor}>
        {educationList.map((edu) => (
          <EducationCard key={edu.id} row={edu} editor={educationEditor} />
        ))}
        <EducationDrawer editor={educationEditor} />
        <EducationModal editor={educationEditor} />
      </ResumeSection>
    </Box>
  );
};
