import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardList, BookOpen, Briefcase, FileCheck } from "lucide-react";

export const Route = createFileRoute("/_authenticated/project-details")({
  component: ProjectDetails,
});

function ProjectDetails() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Project Details & Documentation</h1>
        <p className="text-muted-foreground mt-2">
          Overview of the academic project evaluation, deliverables, and industry relevance.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                <FileCheck className="w-6 h-6" />
              </div>
              <CardTitle>Evaluation Criteria</CardTitle>
            </div>
            <CardDescription>How this project is assessed and evaluated.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Criteria</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right w-[100px]">Weight</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Problem Relevance</TableCell>
                    <TableCell>Clear, practical use case aligned with industry needs</TableCell>
                    <TableCell className="text-right font-semibold">20%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Prompt Engineering</TableCell>
                    <TableCell>Quality, structure, and effectiveness of prompts</TableCell>
                    <TableCell className="text-right font-semibold">25%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Functionality</TableCell>
                    <TableCell>Accuracy and usefulness of AI outputs</TableCell>
                    <TableCell className="text-right font-semibold">25%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Innovation</TableCell>
                    <TableCell>Creativity and uniqueness of the solution</TableCell>
                    <TableCell className="text-right font-semibold">15%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Responsible AI</TableCell>
                    <TableCell>Ethical considerations and limitations addressed</TableCell>
                    <TableCell className="text-right font-semibold">10%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Presentation</TableCell>
                    <TableCell>Clarity, professionalism, and demonstration</TableCell>
                    <TableCell className="text-right font-semibold">5%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <CardTitle>Project Deliverables</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <ul className="space-y-4">
                <li>
                  <h4 className="font-medium text-foreground">AI Solution / Prototype</h4>
                  <p className="text-sm mt-1">Tool, workflow, or interface demonstrating functionality.</p>
                </li>
                <li>
                  <h4 className="font-medium text-foreground">Documentation</h4>
                  <ul className="text-sm list-disc pl-5 mt-1 space-y-1">
                    <li>Problem statement</li>
                    <li>Solution overview</li>
                    <li>Tools used</li>
                    <li>Sample prompts</li>
                    <li>Challenges and solutions</li>
                  </ul>
                </li>
                <li>
                  <h4 className="font-medium text-foreground">Presentation</h4>
                  <ul className="text-sm list-disc pl-5 mt-1 space-y-1">
                    <li>Slide deck or live demo</li>
                    <li>Explanation of features and impact</li>
                  </ul>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                  <Briefcase className="w-6 h-6" />
                </div>
                <CardTitle>Industry Relevance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm space-y-4">
              <p>
                This project simulates real-world tasks and prepares candidates for critical roles in the modern workforce. Organizations are increasingly looking for individuals who can apply AI tools effectively.
              </p>
              <div>
                <h4 className="font-medium text-foreground mb-2">Relevant Roles:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>AI Prompt Engineer</li>
                  <li>AI Productivity Specialist</li>
                  <li>Digital Transformation Analyst</li>
                  <li>Business Analyst (AI-enabled)</li>
                  <li>Operations or Admin roles using AI tools</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}